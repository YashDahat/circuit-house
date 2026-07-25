# Feature Enrichment — Attempt 3

Generated: 2026-07-25

Each section is one LLM call (~5–8K tokens). The instruction tells the generator how all files in the feature interact and what contracts they must honour.

---

## Shared Backend Utilities

**Name:** `shared-backend`  
**Type:** SHARED  
**Change required:** true

**Files in this feature:**
- `backend/src/main/java/com/circuithouse/exception/GlobalExceptionHandler.java` — EXCEPTION handler — provides centralized exception handling for the entire application, mapping specific exceptions to standardized HTTP responses using `handleResourceNotFoundException(ResourceNotFoundException)` and `handleGenericException(Exception)`.
- `backend/src/main/java/com/circuithouse/exception/ResourceNotFoundException.java` — Custom EXCEPTION class — thrown when a requested resource is not found, providing a specific error message.
- `backend/src/main/java/com/circuithouse/dto/ErrorResponse.java` — DTO — defines the standardized structure for API error responses, including a timestamp, status, error message, and path.
- `backend/src/main/java/com/circuithouse/controller/SpaController.java` — CONTROLLER — handles all non-API, non-static requests by forwarding them to the `index.html` file, supporting client-side routing for the single-page application.

**Feature Instruction:**

The Shared Backend Utilities feature provides foundational components for error handling and single-page application (SPA) routing. It defines a standardized `ErrorResponse` DTO for consistent API error reporting, a `ResourceNotFoundException` for common 'not found' scenarios, and a `GlobalExceptionHandler` to catch and format these exceptions into `ErrorResponse` objects. Additionally, the `SpaController` ensures that all non-API, non-static requests are forwarded to `index.html`, enabling the React frontend to handle client-side routing. This setup ensures a robust and user-friendly experience by centralizing error management and seamlessly integrating the backend with the frontend SPA.

---

## Menu Management (Backend)

**Name:** `menu-management-backend`  
**Type:** BACKEND  
**Change required:** true

**Files in this feature:**
- `backend/src/main/java/com/circuithouse/model/MenuItem.java` — JPA entity representing a single item on the restaurant's menu, defining its structure and persistence mapping.
- `backend/src/main/java/com/circuithouse/model/MenuItemCategory.java` — Enum defining the categories for menu items, providing a controlled vocabulary for menu item classification.
- `backend/src/main/java/com/circuithouse/repository/MenuItemRepository.java` — Spring Data JPA repository for CRUD operations on MenuItem entities, exposing methods like findByCategory(MenuItemCategory category).
- `backend/src/main/java/com/circuithouse/dto/MenuItemDto.java` — Data Transfer Object for menu items, used for API requests and responses, including validation annotations.
- `backend/src/main/java/com/circuithouse/service/MenuService.java` — SERVICE layer — implements business logic for menu item management, including createMenuItem(MenuItemDto), getMenuItemById(UUID), updateMenuItem(UUID, MenuItemDto), deleteMenuItem(UUID), getAllMenuItems(), and getMenuItemsByCategory(MenuItemCategory).
- `backend/src/main/java/com/circuithouse/controller/MenuController.java` — Public-facing REST controller for fetching the restaurant menu, exposing GET /api/v1/menu, GET /api/v1/menu/category/{category}, and GET /api/v1/menu/{id}.
- `backend/src/main/java/com/circuithouse/controller/admin/AdminMenuController.java` — Admin-only REST controller for CRUD operations on menu items, exposing POST /api/v1/admin/menu, PUT /api/v1/admin/menu/{id}, DELETE /api/v1/admin/menu/{id}, GET /api/v1/admin/menu, and GET /api/v1/admin/menu/{id}.

**Feature Instruction:**

The Menu Management (Backend) feature provides a comprehensive API for managing and displaying Circuit House's menu items. It consists of JPA entities for `MenuItem` and `MenuItemCategory`, a Spring Data JPA repository for `MenuItem` operations, a DTO for API communication, a service layer for business logic, and two controllers: one for public menu display and another for administrative CRUD operations.

### Data Model
- `MenuItemCategory.java`: An enum defining the categories for menu items, such as APPETIZER, MAIN_COURSE, DESSERT, BEVERAGE.
- `MenuItem.java`: The JPA entity representing a single menu item. It includes fields like `id` (UUID), `name` (String), `description` (String), `price` (BigDecimal), `category` (MenuItemCategory enum), and `imageUrl` (String). It will be mapped to a database table `menu_items`.

### Persistence Layer
- `MenuItemRepository.java`: This interface extends `JpaRepository<MenuItem, UUID>`, providing standard CRUD operations. It will also include custom query methods to find menu items by category or to find all active menu items.

### Data Transfer Objects
- `MenuItemDto.java`: This DTO is used for transferring menu item data between the service layer and the controllers. It mirrors the `MenuItem` entity but is designed for API exposure, including fields like `id`, `name`, `description`, `price`, `category`, and `imageUrl`. It will include validation annotations for incoming requests.

### Service Layer
- `MenuService.java`: This service encapsulates the business logic for menu management. It is responsible for:
    1. **`getAllMenuItems()`**: Retrieves all menu items, converting them from `MenuItem` entities to `MenuItemDto`s.
    2. **`getMenuItemsByCategory(MenuItemCategory category)`**: Retrieves menu items filtered by a specific category, converting them to `MenuItemDto`s.
    3. **`getMenuItemById(UUID id)`**: Retrieves a single menu item by its ID, converting it to a `MenuItemDto`. Throws `ResourceNotFoundException` if the item does not exist.
    4. **`createMenuItem(MenuItemDto menuItemDto)`**: Creates a new menu item. It converts the `MenuItemDto` to a `MenuItem` entity, saves it via `MenuItemRepository`, and returns the saved item as a `MenuItemDto`.
    5. **`updateMenuItem(UUID id, MenuItemDto menuItemDto)`**: Updates an existing menu item. It first fetches the existing item by ID. If found, it updates its properties from the `menuItemDto`, saves the changes, and returns the updated item as a `MenuItemDto`. Throws `ResourceNotFoundException` if the item does not exist.
    6. **`deleteMenuItem(UUID id)`**: Deletes a menu item by its ID. Throws `ResourceNotFoundException` if the item does not exist.

### Controller Layer
- `MenuController.java`: This REST controller exposes public API endpoints for retrieving menu information. It injects `MenuService` and uses it to handle requests for fetching all menu items or filtering them by category. All endpoints return `MenuItemDto` objects.
    - `GET /api/v1/menu`: Retrieves all menu items.
    - `GET /api/v1/menu/category/{category}`: Retrieves menu items by category.
    - `GET /api/v1/menu/{id}`: Retrieves a single menu item by ID.

- `AdminMenuController.java`: This REST controller provides administrative API endpoints for CRUD operations on menu items. It injects `MenuService` and requires `ADMIN` authentication. It handles requests for creating, updating, and deleting menu items, as well as retrieving them for administrative purposes. All endpoints return `MenuItemDto` objects.
    - `POST /api/v1/admin/menu`: Creates a new menu item.
    - `PUT /api/v1/admin/menu/{id}`: Updates an existing menu item.
    - `DELETE /api/v1/admin/menu/{id}`: Deletes a menu item.
    - `GET /api/v1/admin/menu`: Retrieves all menu items (for admin view).
    - `GET /api/v1/admin/menu/{id}`: Retrieves a single menu item by ID (for admin view).

### Error Handling
Both controllers will leverage the `GlobalExceptionHandler` from the `shared-backend` feature to handle exceptions like `ResourceNotFoundException` (returning HTTP 404) and generic `Exception` (returning HTTP 500).

---

## Reservation System (Backend)

**Name:** `reservation-system-backend`  
**Type:** BACKEND  
**Change required:** true

**Files in this feature:**
- `backend/src/main/java/com/circuithouse/model/Reservation.java` — JPA entity representing a customer's table reservation, used by ReservationRepository and ReservationService.
- `backend/src/main/java/com/circuithouse/model/ReservationStatus.java` — Enum defining the possible states of a reservation (PENDING, CONFIRMED, CANCELLED, COMPLETED), used by Reservation and ReservationService.
- `backend/src/main/java/com/circuithouse/repository/ReservationRepository.java` — REPOSITORY layer — extends JpaRepository for Reservation entities and provides custom query methods for finding reservations by status and customer email.
- `backend/src/main/java/com/circuithouse/dto/CreateReservationRequest.java` — DTO for capturing new reservation requests from the public-facing form, used by ReservationController and ReservationService.
- `backend/src/main/java/com/circuithouse/dto/ReservationResponse.java` — DTO for returning reservation details via the API, used by ReservationService and ReservationController.
- `backend/src/main/java/com/circuithouse/service/ReservationService.java` — SERVICE layer — implements createReservation(CreateReservationRequest): ReservationResponse, getReservationById(UUID): ReservationResponse, getAllReservations(): List<ReservationResponse>, getReservationsByStatus(ReservationStatus): List<ReservationResponse>, updateReservationStatus(UUID, ReservationStatus): ReservationResponse, and deleteReservation(UUID): void; delegates persistence to ReservationRepository.
- `backend/src/main/java/com/circuithouse/controller/ReservationController.java` — Public REST controller for submitting new table reservations, exposing createReservation(CreateReservationRequest): ResponseEntity<ReservationResponse>.
- `backend/src/main/java/com/circuithouse/controller/admin/AdminReservationController.java` — Admin-only REST controller for viewing and managing all reservations, exposing getAllReservations(): ResponseEntity<List<ReservationResponse>>, getReservationById(UUID): ResponseEntity<ReservationResponse>, updateReservationStatus(UUID, ReservationStatus): ResponseEntity<ReservationResponse>, and deleteReservation(UUID): ResponseEntity<Void>.

**Feature Instruction:**

The Reservation System (Backend) feature provides a robust API for managing table reservations at Circuit House. It includes JPA entities for `Reservation` and `ReservationStatus`, a Spring Data JPA repository for persistence, DTOs for request and response payloads, and service and controller layers for business logic and API exposure.

### Data Models

1.  **Reservation.java**: This JPA entity represents a single table reservation. It includes fields such as `id` (UUID), `customerName` (String), `customerEmail` (String), `customerPhone` (String), `reservationTime` (LocalDateTime), `numberOfGuests` (int), `status` (ReservationStatus enum), and `notes` (String). The `status` field will default to `PENDING` upon creation.
2.  **ReservationStatus.java**: An enum defining the possible states of a reservation: `PENDING`, `CONFIRMED`, `CANCELLED`, `COMPLETED`.

### Repository Layer

1.  **ReservationRepository.java**: This interface extends `JpaRepository<Reservation, UUID>` and provides standard CRUD operations. It will also include custom query methods to find reservations by `reservationTime` and `status`, and to find all reservations for a specific `customerEmail`.

### DTO Layer

1.  **CreateReservationRequest.java**: This DTO is used for incoming requests to create a new reservation. It contains `customerName` (String, @NotBlank), `customerEmail` (String, @NotBlank, @Email), `customerPhone` (String, @NotBlank), `reservationTime` (LocalDateTime, @NotNull, @FutureOrPresent), `numberOfGuests` (int, @Min(1)), and `notes` (String, @Size(max=500)).
2.  **ReservationResponse.java**: This DTO is used for outgoing responses, providing full details of a reservation. It includes `id` (UUID), `customerName` (String), `customerEmail` (String), `customerPhone` (String), `reservationTime` (LocalDateTime), `numberOfGuests` (int), `status` (ReservationStatus), and `notes` (String).

### Service Layer

1.  **ReservationService.java**: This service orchestrates the business logic for reservations. It injects `ReservationRepository`.
    *   `createReservation(CreateReservationRequest request)`: ReservationResponse
        1.  Validates the `CreateReservationRequest` fields. If `reservationTime` is in the past, throw `IllegalArgumentException`.
        2.  Creates a new `Reservation` entity from the request, setting the `status` to `PENDING`.
        3.  Saves the `Reservation` entity using `reservationRepository.save()`.
        4.  Returns a `ReservationResponse` mapped from the saved `Reservation`.
    *   `getReservationById(UUID id)`: ReservationResponse
        1.  Retrieves a `Reservation` by `id` using `reservationRepository.findById()`. If not found, throw `ResourceNotFoundException`.
        2.  Returns a `ReservationResponse` mapped from the found `Reservation`.
    *   `getAllReservations()`: List<ReservationResponse>
        1.  Retrieves all `Reservation` entities using `reservationRepository.findAll()`.
        2.  Returns a list of `ReservationResponse` mapped from the entities.
    *   `getReservationsByStatus(ReservationStatus status)`: List<ReservationResponse>
        1.  Retrieves `Reservation` entities by `status` using a custom query method from `ReservationRepository`.
        2.  Returns a list of `ReservationResponse` mapped from the entities.
    *   `updateReservationStatus(UUID id, ReservationStatus newStatus)`: ReservationResponse
        1.  Retrieves the `Reservation` by `id`. If not found, throw `ResourceNotFoundException`.
        2.  Updates the `status` of the reservation to `newStatus`.
        3.  Saves the updated `Reservation` entity using `reservationRepository.save()`.
        4.  Returns a `ReservationResponse` mapped from the updated `Reservation`.
    *   `deleteReservation(UUID id)`: void
        1.  Checks if the `Reservation` exists by `id`. If not found, throw `ResourceNotFoundException`.
        2.  Deletes the `Reservation` entity using `reservationRepository.deleteById()`.

### Controller Layer

1.  **ReservationController.java**: This REST controller handles public-facing reservation requests. It injects `ReservationService`.
    *   `POST /api/v1/reservations`: `createReservation(@RequestBody @Valid CreateReservationRequest request)`
        1.  Calls `reservationService.createReservation(request)`.
        2.  Returns `201 Created` with the `ReservationResponse`.
        3.  Handles `IllegalArgumentException` (returns `400 Bad Request`) and other exceptions via `GlobalExceptionHandler`.

2.  **AdminReservationController.java**: This REST controller handles admin-only operations for reservations. It injects `ReservationService`.
    *   `GET /api/v1/admin/reservations`: `getAllReservations()`
        1.  Calls `reservationService.getAllReservations()`.
        2.  Returns `200 OK` with a list of `ReservationResponse`.
    *   `GET /api/v1/admin/reservations/{id}`: `getReservationById(@PathVariable UUID id)`
        1.  Calls `reservationService.getReservationById(id)`.
        2.  Returns `200 OK` with the `ReservationResponse`.
        3.  Handles `ResourceNotFoundException` (returns `404 Not Found`) via `GlobalExceptionHandler`.
    *   `PUT /api/v1/admin/reservations/{id}/status`: `updateReservationStatus(@PathVariable UUID id, @RequestParam ReservationStatus status)`
        1.  Calls `reservationService.updateReservationStatus(id, status)`.
        2.  Returns `200 OK` with the updated `ReservationResponse`.
        3.  Handles `ResourceNotFoundException` (returns `404 Not Found`) via `GlobalExceptionHandler`.
    *   `DELETE /api/v1/admin/reservations/{id}`: `deleteReservation(@PathVariable UUID id)`
        1.  Calls `reservationService.deleteReservation(id)`.
        2.  Returns `204 No Content`.
        3.  Handles `ResourceNotFoundException` (returns `404 Not Found`) via `GlobalExceptionHandler`.

### Error Handling

This feature leverages the `GlobalExceptionHandler` from the `shared-backend` feature to provide consistent error responses. Specifically, `ResourceNotFoundException` will map to a `404 Not Found` and `IllegalArgumentException` will map to a `400 Bad Request`.

---

## Order Management (Backend)

**Name:** `order-management-backend`  
**Type:** BACKEND  
**Change required:** true

**Files in this feature:**
- `backend/src/main/java/com/circuithouse/model/Order.java` — JPA entity representing a customer's online food order, containing details like customer information, total amount, order time, status, and a collection of order items.
- `backend/src/main/java/com/circuithouse/model/OrderItem.java` — JPA entity representing a single line item within an Order, linking to a MenuItem and storing quantity and price at the time of order.
- `backend/src/main/java/com/circuithouse/model/OrderStatus.java` — Enum for the status of an online order, defining the possible states an order can be in.
- `backend/src/main/java/com/circuithouse/repository/OrderRepository.java` — REPOSITORY layer — provides CRUD operations for Order entities.
- `backend/src/main/java/com/circuithouse/repository/OrderItemRepository.java` — REPOSITORY layer — provides CRUD operations for OrderItem entities.
- `backend/src/main/java/com/circuithouse/dto/CreateOrderRequest.java` — DTO for capturing new online order requests from the checkout flow, including customer details and a list of items.
- `backend/src/main/java/com/circuithouse/dto/OrderItemRequest.java` — DTO representing a single item within a CreateOrderRequest, specifying the menu item ID and quantity.
- `backend/src/main/java/com/circuithouse/dto/OrderResponse.java` — DTO for returning full order details, including items, via the API.
- `backend/src/main/java/com/circuithouse/service/OrderService.java` — SERVICE layer — implements createOrder(CreateOrderRequest): OrderResponse, updateOrderStatus(UUID, OrderStatus): OrderResponse, getAllOrders(): List<OrderResponse>, and getOrderById(UUID): OrderResponse; delegates persistence to OrderRepository and interacts with Menu Management, Payment Processing, and Notification Service features.
- `backend/src/main/java/com/circuithouse/controller/OrderController.java` — CONTROLLER layer — exposes public REST endpoints for customers to submit new online orders.
- `backend/src/main/java/com/circuithouse/controller/admin/AdminOrderController.java` — CONTROLLER layer — exposes admin-only REST endpoints for viewing and managing all online orders.

**Feature Instruction:**

The Order Management (Backend) feature handles the complete lifecycle of customer food orders, from creation through various status updates to final delivery. It integrates with the Menu Management feature to validate ordered items, the Payment Processing feature to handle payment initiation and status updates, and the Notification Service to send order confirmations.

## Order Creation Flow
1.  **OrderController.createOrder(CreateOrderRequest request)**:
    *   Receives a `CreateOrderRequest` from the frontend, containing customer details and a list of `OrderItemRequest` objects.
    *   Calls `OrderService.createOrder(CreateOrderRequest request)`.
    *   Returns a `ResponseEntity` with `OrderResponse` and HTTP status 201 (Created) on success.
    *   Throws `IllegalArgumentException` if menu items are invalid or out of stock, returning HTTP status 400 (Bad Request).

2.  **OrderService.createOrder(CreateOrderRequest request)**:
    *   **Signature**: `public OrderResponse createOrder(CreateOrderRequest request)`
    *   **Logic**:
        1.  Validates each `OrderItemRequest` by calling `menuItemRepository.findById(menuItemId)` from the Menu Management feature to ensure the `MenuItem` exists and retrieves its details (name, price).
        2.  Calculates the total amount of the order.
        3.  Creates a new `Order` entity with `OrderStatus.PENDING_PAYMENT`.
        4.  Creates `OrderItem` entities for each item in the request, linking them to the `Order`.
        5.  Persists the `Order` and `OrderItem` entities using `orderRepository.save()` and `orderItemRepository.saveAll()`.
        6.  Initiates payment by calling `paymentService.initiatePayment(orderId, totalAmount, customerEmail)` from the Payment Processing feature. This call is expected to return `PaymentDetails` which includes a payment gateway order ID.
        7.  Updates the `Order` entity with the payment gateway order ID and saves it.
        8.  Constructs and returns an `OrderResponse` DTO.
    *   **Error Cases**:
        *   Throws `ResourceNotFoundException` if any `MenuItem` specified in `OrderItemRequest` is not found (HTTP 404).
        *   Throws `PaymentGatewayException` if the payment initiation fails (HTTP 500).

## Order Status Update Flow
1.  **OrderService.updateOrderStatus(UUID orderId, OrderStatus newStatus)**:
    *   **Signature**: `public OrderResponse updateOrderStatus(UUID orderId, OrderStatus newStatus)`
    *   **Logic**:
        1.  Retrieves the `Order` by `orderId` using `orderRepository.findById(orderId)`.
        2.  Updates the `status` field of the `Order` entity to `newStatus`.
        3.  Persists the updated `Order` using `orderRepository.save()`.
        4.  Sends a notification to the customer about the status change by calling `notificationService.sendOrderStatusUpdate(orderId, newStatus, customerEmail)` from the Notification Service feature.
        5.  Constructs and returns an `OrderResponse` DTO.
    *   **Error Cases**:
        *   Throws `ResourceNotFoundException` if the `Order` is not found (HTTP 404).

## Admin Order Management
1.  **AdminOrderController.getAllOrders()**:
    *   Retrieves all orders by calling `OrderService.getAllOrders()`.
    *   Returns a `ResponseEntity` with a `List<OrderResponse>` and HTTP status 200 (OK).

2.  **AdminOrderController.getOrderById(UUID orderId)**:
    *   Retrieves a specific order by `orderId` by calling `OrderService.getOrderById(orderId)`.
    *   Returns a `ResponseEntity` with `OrderResponse` and HTTP status 200 (OK).
    *   Throws `ResourceNotFoundException` if the order is not found, returning HTTP status 404 (Not Found).

3.  **AdminOrderController.updateOrderStatus(UUID orderId, OrderStatus newStatus)**:
    *   Updates the status of an order by calling `OrderService.updateOrderStatus(orderId, newStatus)`.
    *   Returns a `ResponseEntity` with `OrderResponse` and HTTP status 200 (OK).
    *   Throws `ResourceNotFoundException` if the order is not found, returning HTTP status 404 (Not Found).

4.  **OrderService.getAllOrders()**:
    *   **Signature**: `public List<OrderResponse> getAllOrders()`
    *   **Logic**:
        1.  Retrieves all `Order` entities from `orderRepository.findAll()`.
        2.  Maps each `Order` entity to an `OrderResponse` DTO.
        3.  Returns the list of `OrderResponse` DTOs.

5.  **OrderService.getOrderById(UUID orderId)**:
    *   **Signature**: `public OrderResponse getOrderById(UUID orderId)`
    *   **Logic**:
        1.  Retrieves the `Order` entity by `orderId` from `orderRepository.findById(orderId)`.
        2.  If not found, throws `ResourceNotFoundException`.
        3.  Maps the `Order` entity to an `OrderResponse` DTO.
        4.  Returns the `OrderResponse` DTO.
    *   **Error Cases**:
        *   Throws `ResourceNotFoundException` if the `Order` is not found.

## Data Models and DTOs
*   **Order.java**: JPA entity for an order, containing fields like `id`, `customerName`, `customerEmail`, `customerPhone`, `deliveryAddress`, `totalAmount`, `orderTime`, `status`, and a one-to-many relationship with `OrderItem`.
*   **OrderItem.java**: JPA entity for an item within an order, containing fields like `id`, `menuItem` (many-to-one to `MenuItem` from Menu Management), `quantity`, `priceAtOrder`, and a many-to-one relationship with `Order`.
*   **OrderStatus.java**: Enum defining possible order statuses: `PENDING_PAYMENT`, `RECEIVED`, `PREPARING`, `READY_FOR_PICKUP`, `DELIVERED`, `CANCELLED`.
*   **CreateOrderRequest.java**: DTO for incoming order requests, including `customerName`, `customerEmail`, `customerPhone`, `deliveryAddress`, and a `List<OrderItemRequest>`.
*   **OrderItemRequest.java**: DTO for a single item in `CreateOrderRequest`, including `menuItemId` and `quantity`.
*   **OrderResponse.java**: DTO for outgoing order details, including `id`, `customerName`, `customerEmail`, `customerPhone`, `deliveryAddress`, `totalAmount`, `orderTime`, `status`, and a `List<OrderItemResponse>` (where `OrderItemResponse` mirrors `OrderItem` fields).

## Repositories
*   **OrderRepository.java**: Extends `JpaRepository<Order, UUID>` for `Order` entity persistence.
*   **OrderItemRepository.java**: Extends `JpaRepository<OrderItem, UUID>` for `OrderItem` entity persistence.

## Cross-Feature Interactions
*   **Menu Management (backend)**: `OrderService` injects `MenuItemRepository` to validate and retrieve `MenuItem` details during order creation. Specifically, `menuItemRepository.findById(UUID id)` is called.
*   **Payment Processing (backend)**: `OrderService` injects `PaymentService` to initiate payments for new orders. Specifically, `paymentService.initiatePayment(UUID orderId, BigDecimal amount, String customerEmail)` is called.
*   **Notification Service (backend)**: `OrderService` injects `NotificationService` to send order status update notifications. Specifically, `notificationService.sendOrderStatusUpdate(UUID orderId, OrderStatus newStatus, String customerEmail)` is called.

---

## Payment Processing (Backend)

**Name:** `payment-processing-backend`  
**Type:** BACKEND  
**Change required:** true

**Files in this feature:**
- `backend/src/main/java/com/circuithouse/service/PaymentService.java` — SERVICE layer — implements initiatePayment(UUID orderId, BigDecimal amount): PaymentDetails and verifyPaymentSignature(String paymentGatewayOrderId, String razorpayPaymentId, String razorpaySignature): boolean; interacts with the payment gateway API.
- `backend/src/main/java/com/circuithouse/controller/PaymentController.java` — CONTROLLER layer — exposes POST /api/v1/payments/initiate and POST /api/v1/payments/webhook endpoints; orchestrates calls to PaymentService and OrderService.
- `backend/src/main/java/com/circuithouse/dto/PaymentDetails.java` — DTO — defines the structure for transferring payment gateway order details.

**Feature Instruction:**

The Payment Processing (Backend) feature handles interactions with a payment gateway to facilitate online payments for orders. It comprises a `PaymentService` for core payment logic, a `PaymentController` to manage payment-related API endpoints, and a `PaymentDetails` DTO for transferring payment gateway order information to the frontend.

**PaymentService.java**
This service is responsible for initiating payment orders with the payment gateway and verifying payment signatures. It exposes two public methods:
1. `initiatePayment(UUID orderId, BigDecimal amount)`: This method takes an `orderId` and `amount` as input. It interacts with the payment gateway's API to create a payment order. Upon successful creation, it returns a `PaymentDetails` DTO containing the payment gateway's order ID, amount, currency, and signature. This DTO is then sent to the frontend to complete the payment process. If the payment gateway interaction fails, it should throw a `PaymentGatewayException`.
2. `verifyPaymentSignature(String paymentGatewayOrderId, String razorpayPaymentId, String razorpaySignature)`: This method is called after the payment gateway has processed the payment and sent a webhook. It takes the `paymentGatewayOrderId`, `razorpayPaymentId`, and `razorpaySignature` as input. It uses these details to verify the authenticity of the payment using the payment gateway's SDK. If the signature is valid, it returns `true`; otherwise, it returns `false`.

**PaymentController.java**
This controller exposes API endpoints related to payment processing. It injects `PaymentService` and `OrderService` (from the `order-management-backend` feature).
1. `POST /api/v1/payments/initiate`: This endpoint accepts a request to initiate a payment for a given order. The request body should contain the `orderId` (UUID) and `amount` (BigDecimal). It calls `paymentService.initiatePayment(orderId, amount)`. If successful, it returns a `PaymentDetails` DTO with an HTTP status of 200 OK. If `paymentService.initiatePayment` throws a `PaymentGatewayException`, the controller should catch it and return an appropriate error response with an HTTP status of 500 Internal Server Error.
2. `POST /api/v1/payments/webhook`: This endpoint is designed to receive webhooks from the payment gateway after a payment has been processed. The request body will contain the payment gateway's order ID, payment ID, and signature. It calls `paymentService.verifyPaymentSignature(paymentGatewayOrderId, razorpayPaymentId, razorpaySignature)`. If the signature is valid, it then calls `orderService.updateOrderStatus(paymentGatewayOrderId, OrderStatus.COMPLETED)` to update the order status in the `order-management-backend` feature. If the signature is invalid, it should return an HTTP status of 400 Bad Request. If the order status update fails, it should return an HTTP status of 500 Internal Server Error.

**PaymentDetails.java**
This DTO is used to transfer payment gateway order details from the backend to the frontend. It contains the following fields: `paymentGatewayOrderId` (String), `amount` (BigDecimal), `currency` (String), and `signature` (String). These fields are essential for the frontend to render the payment gateway's checkout form and complete the payment.

**Inter-feature Wiring:**
- `PaymentController` injects `PaymentService` and `OrderService` (from `order-management-backend`).
- `PaymentController.webhook` calls `orderService.updateOrderStatus(UUID orderId, OrderStatus newStatus)` from the `order-management-backend` feature to update the order status after a successful payment.

---

## Event Management (Backend)

**Name:** `event-management-backend`  
**Type:** BACKEND  
**Change required:** true

**Files in this feature:**
- `backend/src/main/java/com/circuithouse/model/Event.java` — JPA entity representing a special event, defining its structure and mapping to the database table.
- `backend/src/main/java/com/circuithouse/repository/EventRepository.java` — REPOSITORY layer — provides data access operations for Event entities, including a custom query to find active events.
- `backend/src/main/java/com/circuithouse/dto/EventDto.java` — DTO layer — defines the data structure for event details exchanged via the API.
- `backend/src/main/java/com/circuithouse/service/EventService.java` — SERVICE layer — implements business logic for event management, including CRUD operations and fetching upcoming events.
- `backend/src/main/java/com/circuithouse/controller/EventController.java` — CONTROLLER layer — exposes public API endpoints for fetching upcoming events.
- `backend/src/main/java/com/circuithouse/controller/admin/AdminEventController.java` — CONTROLLER layer — exposes admin-only API endpoints for full CRUD operations on events.

**Feature Instruction:**

The Event Management (Backend) feature provides a comprehensive API for managing special events at Circuit House. It includes a JPA entity (`Event.java`), a Spring Data JPA repository (`EventRepository.java`), a Data Transfer Object (`EventDto.java`), a service layer (`EventService.java`) encapsulating business logic, and two controllers: `EventController.java` for public access to view events, and `AdminEventController.java` for administrative CRUD operations.

`Event.java` defines the `Event` entity with fields for `id`, `name`, `description`, `date`, `time`, `imageUrl`, and `active`. The `id` is a UUID, `name` and `description` are strings, `date` is a `LocalDate`, `time` is a `LocalTime`, `imageUrl` is a string for the event poster, and `active` is a boolean to indicate if the event is currently visible.

`EventRepository.java` extends `JpaRepository<Event, UUID>`, providing standard CRUD operations. It will also include a custom query method `findByActiveTrueOrderByDateAscTimeAsc` to fetch all active events, ordered by date and time, for the public-facing API.

`EventDto.java` is used for all API interactions, mapping between the `Event` entity and the external representation. It mirrors the fields of the `Event` entity and includes validation annotations like `@NotNull` and `@Size`.

`EventService.java` orchestrates the business logic. It injects `EventRepository` and provides the following public methods:
- `getAllEvents()`: Returns `List<EventDto>` of all events, active or inactive.
- `getUpcomingEvents()`: Returns `List<EventDto>` of active events, sorted by date and time. This method calls `eventRepository.findByActiveTrueOrderByDateAscTimeAsc()`.
- `getEventById(UUID id)`: Returns `EventDto` for a given ID. Throws `ResourceNotFoundException` if the event is not found.
- `createEvent(EventDto eventDto)`: Creates a new event. It maps the `EventDto` to an `Event` entity, saves it via `eventRepository.save()`, and returns the saved entity as an `EventDto`.
- `updateEvent(UUID id, EventDto eventDto)`: Updates an existing event. It retrieves the event by ID, updates its fields from the `EventDto`, saves the updated entity, and returns it as an `EventDto`. Throws `ResourceNotFoundException` if the event is not found.
- `deleteEvent(UUID id)`: Deletes an event by ID. Throws `ResourceNotFoundException` if the event is not found.

`EventController.java` exposes public API endpoints for retrieving event information. It injects `EventService` and provides:
- `getAllUpcomingEvents()`: Handles `GET /api/v1/events` to return a `ResponseEntity<List<EventDto>>` of all active, upcoming events. It calls `eventService.getUpcomingEvents()`.

`AdminEventController.java` exposes administrative API endpoints for managing events. It injects `EventService` and provides:
- `getAllEvents()`: Handles `GET /api/v1/admin/events` to return a `ResponseEntity<List<EventDto>>` of all events (active and inactive). It calls `eventService.getAllEvents()`.
- `getEventById(UUID id)`: Handles `GET /api/v1/admin/events/{id}` to return a `ResponseEntity<EventDto>` for a specific event. It calls `eventService.getEventById(id)`.
- `createEvent(EventDto eventDto)`: Handles `POST /api/v1/admin/events` to create a new event. It calls `eventService.createEvent(eventDto)` and returns a `ResponseEntity<EventDto>` with HTTP status 201 (Created).
- `updateEvent(UUID id, EventDto eventDto)`: Handles `PUT /api/v1/admin/events/{id}` to update an existing event. It calls `eventService.updateEvent(id, eventDto)` and returns a `ResponseEntity<EventDto>`.
- `deleteEvent(UUID id)`: Handles `DELETE /api/v1/admin/events/{id}` to delete an event. It calls `eventService.deleteEvent(id)` and returns a `ResponseEntity<Void>` with HTTP status 204 (No Content).

Error handling for `ResourceNotFoundException` will be managed by the `GlobalExceptionHandler` from the `shared-backend` feature, returning an `ErrorResponse` with HTTP status 404.

---

## Notification Service (Backend)

**Name:** `notification-service-backend`  
**Type:** BACKEND  
**Change required:** true

**Files in this feature:**
- `backend/src/main/java/com/circuithouse/service/NotificationService.java` — SERVICE layer — implements sendOrderConfirmation(Order order): void and sendReservationConfirmation(Reservation reservation): void; responsible for constructing and dispatching email notifications.

**Feature Instruction:**

The Notification Service (Backend) is responsible for sending various types of notifications, such as email confirmations for orders and reservations. It integrates with external email services to deliver these notifications. The `NotificationService.java` file contains the core business logic for constructing and sending notification messages. This service is designed to be called by other backend features (like order-management-backend and reservation-system-backend) when a notification needs to be dispatched. It will not expose any direct API endpoints but will offer public methods for internal service-to-service communication. The service will handle the formatting of notification content based on the type of event (e.g., order confirmation, reservation confirmation) and the relevant data (Order or Reservation objects). It will use a placeholder for an external email sending mechanism, which in a real-world scenario would be replaced by an actual email client (e.g., JavaMailSender, SendGrid client).

---

## Data Seeding (Backend)

**Name:** `data-seeding-backend`  
**Type:** BACKEND  
**Change required:** true

**Files in this feature:**
- `backend/src/main/java/com/circuithouse/config/DataSeeder.java` — CONFIG layer — implements `CommandLineRunner` to seed initial data for menu items and events on application startup by calling `menuService.createMenuItem(MenuItemDto menuItemDto)` and `eventService.createEvent(EventDto eventDto)`.

**Feature Instruction:**

The `DataSeeder.java` file is a Spring Boot `CommandLineRunner` that executes on application startup to populate the database with initial data for menu items and events. It ensures that the application has essential business data available immediately after deployment, which is crucial for demonstration, testing, and initial production setup. The seeder injects `MenuService` and `EventService` to interact with the respective domain services for creating new menu items and events. It defines a list of `MenuItemDto` objects with details such as name, description, price, category, and image URL, and a list of `EventDto` objects with details like name, description, date, time, and image URL. On run, it first checks if the database already contains menu items or events. If not, it iterates through the predefined lists and calls `menuService.createMenuItem(MenuItemDto menuItemDto)` for each menu item and `eventService.createEvent(EventDto eventDto)` for each event. This prevents duplicate data from being inserted on subsequent application restarts. The image URLs for menu items and events are Unsplash links, ensuring they are publicly accessible.

---

## Core Frontend

**Name:** `core-frontend`  
**Type:** FRONTEND  
**Change required:** true

**Files in this feature:**
- `frontend/src/api/client.ts` — SERVICE layer — Configures the global Axios instance with base URL, JWT interceptor, and error handling.
- `frontend/src/App.tsx` — Root component — Sets up React Router and global context providers, including AuthContext.
- `frontend/src/components/layout/Layout.tsx` — COMPONENT — Provides the main layout for public-facing pages, including Header, Footer, and content area.
- `frontend/src/components/layout/Header.tsx` — COMPONENT — Renders the site-wide header with logo, navigation, and login CTA.
- `frontend/src/components/layout/Footer.tsx` — COMPONENT — Renders the site-wide footer with contact information and navigation.
- `frontend/src/components/layout/AdminLayout.tsx` — COMPONENT — Provides the layout for admin pages, including a sidebar and content area.
- `frontend/src/components/layout/AdminSidebar.tsx` — COMPONENT — Renders the navigation sidebar for the admin area.
- `frontend/src/components/shared/WhatsAppButton.tsx` — COMPONENT — Renders a floating action button for quick WhatsApp contact.
- `frontend/src/components/shared/SeoSchema.tsx` — COMPONENT — Injects JSON-LD schema markup for SEO purposes.

**Feature Instruction:**

The `core-frontend` feature establishes the foundational structure and shared utilities for the entire Circuit House restaurant web application. It includes the global Axios client configuration, the main React application setup, public and admin layout components, shared UI elements, and SEO schema integration.

## Design Tokens
- Navbar: bg-[#1A202C] text-white
- Primary CTA: bg-[#D69E2E] hover:bg-[#B78726] text-white font-semibold rounded-full px-8 py-3 transition-all duration-200
- Brand text accent: text-[#D69E2E]
- Section bg: bg-[#F7FAFC] (odd sections) / bg-white (even sections)
- Card: bg-white rounded-xl shadow-md border border-gray-100 p-6
- Section container: <section className="py-16 px-4"><div className="max-w-7xl mx-auto">
- Hero h1: text-4xl md:text-6xl font-bold text-white
- Body: text-[#2D3748] leading-relaxed

### `frontend/src/api/client.ts`
This file configures the global Axios instance. It sets the `baseURL` to `/api/v1` for all requests. It also includes an interceptor to attach the JWT token from `localStorage` (key: 'token') to the `Authorization` header for every outgoing request. Another interceptor handles common error responses, specifically redirecting to the login page if a 401 Unauthorized status is received.

### `frontend/src/App.tsx`
This is the root component of the application. It sets up the `BrowserRouter` from `react-router-dom` for client-side routing. It wraps the entire application with `AuthContext.Provider` (from `auth-frontend`) to make authentication state globally available. All public and admin routes will be defined here or in child components, utilizing the `Layout` and `AdminLayout` components respectively.

### `frontend/src/components/layout/Layout.tsx`
This component provides the main layout for all public-facing pages. It renders the `Header` at the top, the `Footer` at the bottom, and an `Outlet` in between for dynamic page content. It also includes the `WhatsAppButton` for easy customer contact. The overall structure should reflect an elegant and spacious design, using the defined design tokens for backgrounds and text.

### `frontend/src/components/layout/Header.tsx`
This component renders the site-wide header. It includes the Circuit House logo (as text for now, styled with `text-[#D69E2E]`), navigation links to public pages (Home, Menu, Events, Reservations, About, Contact), and a "Login" button that navigates to `/admin/login`. The navigation links should be styled to be clean and modern, reflecting the confident tone.

### `frontend/src/components/layout/Footer.tsx`
This component provides the site-wide footer. It displays the business name "Circuit House", contact information (address: Laxman Nagar, Baner, Pune, Maharashtra 411045; phone: 070587 56269), opening hours (placeholder: "Mon-Sun: 11:00 AM - 11:00 PM"), and quick navigation links. It should also include social media icons (placeholder links). The design should be clean and functional, using the defined design tokens.

### `frontend/src/components/layout/AdminLayout.tsx`
This component provides the layout for all admin-facing pages. It includes the `AdminSidebar` on the left and an `Outlet` for the main content area. This layout is protected by the `ProtectedRoute` from `auth-frontend` to ensure only authenticated users can access it. The design should be functional and clear for administrative tasks.

### `frontend/src/components/layout/AdminSidebar.tsx`
This component renders the navigation sidebar for the admin area. It includes links to various admin sections such as Dashboard, Menu Management, Reservations, Orders, and Event Management. It also includes a "Logout" button that calls the `logout` function from `AuthContext`.

### `frontend/src/components/shared/WhatsAppButton.tsx`
This component renders a floating action button that allows users to quickly initiate a WhatsApp chat. The button should be positioned at the bottom right of the screen and use the brand's accent color. When clicked, it should open a new tab/window to `https://wa.me/917058756269`.

### `frontend/src/components/shared/SeoSchema.tsx`
This component dynamically injects JSON-LD schema markup into the document's `<head>` for improved SEO. Specifically, it will generate `Restaurant` schema with details like name, address, phone number, and cuisine type. The component should accept props for dynamic data, but for now, use the business context provided: Circuit House, Laxman Nagar, Baner, Pune, Maharashtra 411045, 070587 56269, and coordinates 18.570737, 73.776395.

---

## Authentication (Frontend)

**Name:** `auth-frontend`  
**Type:** FRONTEND  
**Change required:** true

**Files in this feature:**
- `frontend/src/context/AuthContext.tsx` — React context for managing global authentication state (user, token, login/logout functions). It provides the `AuthContext.Provider` to wrap the application and expose the authentication state.
- `frontend/src/hooks/useAuth.ts` — Custom hook providing easy access to the authentication context and actions. It exports the `useAuth()` function.
- `frontend/src/services/authService.ts` — Service for handling authentication API calls (login). It exports the `login(credentials: LoginCredentials): Promise<LoginResponse>` function.
- `frontend/src/types/auth.ts` — TypeScript types and interfaces for authentication data structures. Generated from the backend API contract — authentication.
- `frontend/src/pages/LoginPage.tsx` — Admin login page with a simple form for username and password. It uses the `useAuth` hook to perform login and redirects on success.
- `frontend/src/components/shared/ProtectedRoute.tsx` — A wrapper component that restricts access to admin routes, redirecting unauthenticated users. It exports the `ProtectedRoute` component.

**Feature Instruction:**

This feature provides the frontend authentication mechanism for the Circuit House admin portal. It includes a React Context (`AuthContext.tsx`) to manage the global authentication state, a custom hook (`useAuth.ts`) for easy access to this context, a service (`authService.ts`) to interact with the backend authentication API, and a type definition file (`auth.ts`). It also includes a login page (`LoginPage.tsx`) for administrators to authenticate and a protected route component (`ProtectedRoute.tsx`) to guard admin-only sections of the application.

## Design Tokens
- Navbar: bg-[#1A202C] text-white
- Primary CTA: bg-[#D69E2E] hover:bg-[#B78826] text-white font-semibold rounded-full px-8 py-3 transition-all duration-200
- Brand text accent: text-[#D69E2E]
- Section bg: bg-[#F7FAFC] (odd sections) / bg-gray-50 (even sections)
- Card: bg-white rounded-xl shadow-md border border-gray-100 p-6
- Section container: <section className="py-16 px-4"><div className="max-w-7xl mx-auto">
- Hero h1: text-4xl md:text-6xl font-bold text-white
- Body: text-[#2D3748] leading-relaxed

### AuthContext.tsx
This file defines the `AuthContext` which holds the authentication state, including the `user` object (of type `User` from `auth.ts`) and the `token` (string). It provides `login` and `logout` functions. The `login` function takes `username` and `password`, calls `authService.login`, stores the received `token` in `localStorage` under the key 'token', and updates the context state. The `logout` function clears the `token` from `localStorage` and resets the context state. The `AuthContext.Provider` wraps the application, making the authentication state and functions available to all child components.

### useAuth.ts
This custom hook provides a convenient way for components to access the authentication state and actions from `AuthContext`. It exports a `useAuth` function that returns the `user`, `token`, `login`, and `logout` functions.

### authService.ts
This service handles the actual API call for user login. It exports an `async` function `login(credentials: LoginCredentials): Promise<LoginResponse>`. This function makes a POST request to `/api/v1/auth/login` with the provided `username` and `password`. On successful login, it returns a `LoginResponse` containing the JWT token. It uses the `apiClient` from `frontend/src/api/client.ts` for making the HTTP request.

### auth.ts
This file defines the TypeScript interfaces for authentication-related data structures:
- `LoginCredentials`: `username: string`, `password: string`
- `LoginResponse`: `token: string`
- `User`: `id: string`, `username: string`, `roles: string[]` (This `User` interface represents the decoded information from the JWT token, not necessarily the full user profile from the backend. For this feature, a simple `username` and `roles` array is sufficient).

### LoginPage.tsx
This page provides the user interface for administrators to log in. It uses the `useAuth` hook to access the `login` function. The page displays a form with fields for `username` and `password`. Upon successful login, the user is redirected to the `/admin/dashboard` route. The page should have a clean, modern layout with the Circuit House branding. The form should be centered and visually appealing, using the defined design tokens for colors and typography. The 'Login' button should use the Primary CTA design token.

### ProtectedRoute.tsx
This component acts as a guard for routes that require authentication. It takes `children` as props. It uses the `useAuth` hook to check if a `token` exists in the authentication context. If no `token` is present, it redirects the user to the `/admin/login` page. Otherwise, it renders the `children` components. This ensures that only authenticated users can access specific routes, typically admin routes.

---

## Static Pages (Frontend)

**Name:** `static-pages-frontend`  
**Type:** FRONTEND  
**Change required:** true

**Files in this feature:**
- `frontend/src/pages/HomePage.tsx` — Landing page for the Circuit House website, integrating various sections like hero, featured dishes, testimonials, gallery, and CTA.
- `frontend/src/components/home/HeroSection.tsx` — Component displaying the main hero section with a background image, headline, and primary action buttons for the homepage.
- `frontend/src/components/home/FeaturedDishes.tsx` — Component showcasing a curated list of popular or special menu items, fetching data via the useMenu hook.
- `frontend/src/components/home/TestimonialsSection.tsx` — Component displaying a rotating carousel or grid of curated customer testimonials.
- `frontend/src/components/home/AmbianceGallery.tsx` — Component presenting a small, curated image gallery on the homepage showcasing the restaurant's interior.
- `frontend/src/components/home/CtaSection.tsx` — Component providing a prominent call-to-action section encouraging users to book a table or order online.
- `frontend/src/pages/AboutPage.tsx` — Static page detailing the restaurant's story, mission, and team.
- `frontend/src/pages/ContactPage.tsx` — Contact page with address, phone, email, an embedded Google Map, and a contact form.
- `frontend/src/components/contact/ContactForm.tsx` — Component rendering a form for users to send inquiries to the restaurant.
- `frontend/src/components/contact/LocationMap.tsx` — Component to embed Google Maps showing the restaurant's location.
- `frontend/src/components/contact/ContactInfo.tsx` — Component displaying the restaurant's address, phone number, and opening hours.
- `frontend/src/pages/GalleryPage.tsx` — Page showcasing high-quality photos of the food and restaurant ambiance in a grid layout.
- `frontend/src/pages/NotFoundPage.tsx` — A user-friendly 404 page for handling invalid routes.

**Feature Instruction:**

## Design Tokens
- Navbar: bg-[#1A202C] text-white
- Primary CTA: bg-[#D69E2E] hover:bg-[#c28b29] text-white font-semibold rounded-full px-8 py-3 transition-all duration-200
- Brand text accent: text-[#D69E2E]
- Section bg: bg-[#F7FAFC] (odd sections) / bg-white (even sections)
- Card: bg-white rounded-xl shadow-md border border-gray-100 p-6
- Section container: <section className="py-16 px-4"><div className="max-w-7xl mx-auto">
- Hero h1: text-4xl md:text-6xl font-bold text-white
- Body: text-[#2D3748] leading-relaxed

This feature provides all the static, publicly accessible pages for Circuit House, including the homepage, about us, contact, gallery, and a 404 not found page. These pages are built using React components and leverage the `Layout` component from the `core-frontend` feature for consistent navigation and footer. The design adheres strictly to the provided design tokens for colors, typography, and spacing, ensuring an elegant and modern aesthetic.

### `HomePage.tsx`
This page serves as the main landing page for Circuit House. It integrates several components to present a comprehensive overview of the restaurant:
1.  **`HeroSection`**: Displays a full-bleed hero image with the restaurant's name and a compelling call to action for reservations. The image URL should be `https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=1920&q=80` with a `bg-black bg-opacity-50` overlay.
2.  **`FeaturedDishes`**: Showcases a curated selection of popular menu items. This component will fetch menu items using the `useMenu` hook from `menu-display-frontend` and display them.
3.  **`TestimonialsSection`**: Presents customer testimonials, reinforcing the restaurant's reputation for quality.
4.  **`AmbianceGallery`**: A small gallery of high-quality images showcasing the restaurant's interior and overall ambiance.
5.  **`CtaSection`**: A prominent call-to-action encouraging users to make a reservation or view the full menu.

All sections should use the `Section container` design token for consistent padding and max-width. The `HomePage` wraps its content with the `Layout` component from `core-frontend`.

### `HeroSection.tsx`
This component is responsible for rendering the hero banner on the `HomePage`. It takes `headline` and `subheadline` as props. The background image is a full-bleed image with a dark overlay to ensure text readability. It includes two primary CTA buttons: "Make a Reservation" which navigates to `/reservations` and "View Our Menu" which navigates to `/menu`.

### `FeaturedDishes.tsx`
This component displays a selection of featured dishes. It uses the `useMenu` hook from `menu-display-frontend` to fetch a list of `MenuItemDto` objects. It should display a maximum of 3-4 dishes, each with its `name`, `description`, `price`, and `imageUrl`. The component should have a heading "Our Signature Dishes" and a CTA button "View Full Menu" that navigates to `/menu`.

### `TestimonialsSection.tsx`
This component displays a series of customer testimonials. It should include a heading "What Our Guests Say" and present 2-3 compelling testimonials. Each testimonial should include the customer's name and their feedback, reflecting a confident and welcoming tone.

### `AmbianceGallery.tsx`
This component presents a small, curated image gallery showcasing the restaurant's interior and ambiance. It should include a heading "Our Ambiance" and display 3-4 high-quality images that reflect the elegant and spacious visual style. Use Unsplash images relevant to restaurant interiors.

### `CtaSection.tsx`
This component provides a prominent call-to-action. It should have a headline like "Experience Culinary Excellence" and a subheadline "Book your table today or explore our exquisite menu." It includes two primary CTA buttons: "Reserve Your Table" (navigates to `/reservations`) and "Explore Our Menu" (navigates to `/menu`).

### `AboutPage.tsx`
This page details the story, mission, and team of Circuit House. It should include sections for:
1.  **Our Story**: A narrative about the restaurant's origins and philosophy.
2.  **Our Mission**: A statement on the restaurant's commitment to quality and customer experience.
3.  **Our Team**: Briefly introduce key team members (e.g., Head Chef, Founder) with placeholder names and roles.

The content should reflect a confident and quality-focused tone. The `AboutPage` wraps its content with the `Layout` component from `core-frontend`.

### `ContactPage.tsx`
This page provides all necessary contact information and a contact form. It integrates the following components:
1.  **`ContactInfo`**: Displays the restaurant's address, phone number, and opening hours.
2.  **`LocationMap`**: Embeds a Google Map showing the restaurant's exact location using the provided coordinates.
3.  **`ContactForm`**: A form for users to send inquiries. This form should include fields for `name`, `email`, `subject`, and `message`.

The `ContactPage` wraps its content with the `Layout` component from `core-frontend`.

### `ContactForm.tsx`
This component renders a contact form. It should have input fields for `name` (text), `email` (email), `subject` (text), and `message` (textarea). The form should include a submit button with the text "Send Message". Upon submission, it should display a success or error message to the user. This form does not call a backend API in this feature; it's a placeholder for future integration.

### `LocationMap.tsx`
This component embeds a Google Map centered on the restaurant's coordinates (18.570737, 73.776369). It should display a marker at this location. The map should be responsive and occupy a significant portion of the page.

### `ContactInfo.tsx`
This component displays the restaurant's contact details:
-   **Address**: Laxman Nagar, Baner, Pune, Maharashtra 411045
-   **Phone**: 070587 56269
-   **Opening Hours**: Monday - Sunday: 11:00 AM - 11:00 PM

### `GalleryPage.tsx`
This page showcases high-quality photos of the food and restaurant ambiance in a grid layout. It should include a heading "Our Gallery" and display a diverse set of images, emphasizing the visual style. Use Unsplash images relevant to restaurant food and interiors. The `GalleryPage` wraps its content with the `Layout` component from `core-frontend`.

### `NotFoundPage.tsx`
This page is displayed for invalid routes (404 errors). It should have a prominent heading "404 - Page Not Found" and a friendly message like "Oops! The page you're looking for doesn't exist." It should include a button "Go to Homepage" that navigates to `/`. The `NotFoundPage` wraps its content with the `Layout` component from `core-frontend`.

---

## Menu Display (Frontend)

**Name:** `menu-display-frontend`  
**Type:** FRONTEND  
**Change required:** true

**Files in this feature:**
- `frontend/src/services/menuService.ts` — SERVICE layer — provides functions for interacting with the menu-related backend endpoints, specifically `getAllMenuItems(): Promise<MenuItem[]>` and `getMenuItemsByCategory(category: MenuItemCategory): Promise<MenuItem[]>`.
- `frontend/src/hooks/useMenu.ts` — React Query hook — provides `useMenu(category?: MenuItemCategory)` for fetching and managing menu data with caching and loading states.
- `frontend/src/types/menu.ts` — Generated from the backend API contract — defines TypeScript types for `MenuItem` and `MenuItemCategory`.
- `frontend/src/pages/MenuPage.tsx` — PAGE layer — displays the full digital menu with category filters, search, and a grid of items, utilizing `Layout` from `core-frontend`.
- `frontend/src/components/menu/MenuGrid.tsx` — COMPONENT layer — displays a grid of `MenuItemCard` components, receiving `menuItems: MenuItem[]` as props.
- `frontend/src/components/menu/MenuItemCard.tsx` — COMPONENT layer — displays a single menu item, receiving `menuItem: MenuItem` as props.
- `frontend/src/components/menu/MenuCategoryFilter.tsx` — COMPONENT layer — provides category filter buttons, receiving `categories: MenuItemCategory[]` and `onSelectCategory: (category: MenuItemCategory | undefined) => void` as props.

**Feature Instruction:**

## Design Tokens
- Navbar: bg-[#1A202C] text-white
- Primary CTA: bg-[#D69E2E] hover:bg-[#B78824] text-white font-semibold rounded-full px-8 py-3 transition-all duration-200
- Brand text accent: text-[#D69E2E]
- Section bg: bg-[#F7FAFC] (odd sections) / bg-white (even sections)
- Card: bg-white rounded-xl shadow-md border border-gray-100 p-6
- Section container: <section className="py-16 px-4"><div className="max-w-7xl mx-auto">
- Hero h1: text-4xl md:text-6xl font-bold text-white
- Body: text-[#2D3748] leading-relaxed

This feature provides the frontend components and logic for displaying Circuit House's menu to customers. It consists of a service, a React Query hook, type definitions, a main menu page, and several UI components for displaying menu items and filtering them by category.

### `menu.ts`
This file defines the TypeScript interfaces for `MenuItem` and `MenuItemCategory`, mirroring the backend `MenuItemDto` and `MenuItemCategory` data shapes from the `menu-management-backend` feature. These types are used throughout the frontend to ensure type safety and consistency.

### `menuService.ts`
This service file (`frontend/src/services/menuService.ts`) is responsible for making API calls to the `menu-management-backend` to fetch menu data. It exports two asynchronous functions:
- `getAllMenuItems(): Promise<MenuItem[]>`: This function makes a GET request to `/api/v1/menu` to retrieve all menu items. It returns a promise that resolves to an array of `MenuItem` objects.
- `getMenuItemsByCategory(category: MenuItemCategory): Promise<MenuItem[]>`: This function makes a GET request to `/api/v1/menu/category/{category}` to retrieve menu items filtered by a specific category. It returns a promise that resolves to an array of `MenuItem` objects.

Both functions handle potential errors by logging them and re-throwing to be caught by the calling hook or component.

### `useMenu.ts`
This React Query hook (`frontend/src/hooks/useMenu.ts`) provides a convenient way for components to fetch and manage menu data. It exports a `useMenu` hook that leverages `react-query` to handle caching, loading states, and error handling. The hook has the following signature:
- `useMenu(category?: MenuItemCategory): { data: MenuItem[] | undefined, isLoading: boolean, isError: boolean, error: Error | null }`

When `category` is provided, it calls `menuService.getMenuItemsByCategory(category)`. Otherwise, it calls `menuService.getAllMenuItems()`. The `data` returned by the hook will be an array of `MenuItem` objects, or `undefined` if still loading or an error occurred.

### `MenuCategoryFilter.tsx`
This component (`frontend/src/components/menu/MenuCategoryFilter.tsx`) displays a set of filter buttons or tabs, allowing users to select a menu category. It receives `categories: MenuItemCategory[]` and `onSelectCategory: (category: MenuItemCategory | undefined) => void` as props. When a category button is clicked, it calls `onSelectCategory` with the selected category. An "All" option should be available to clear the category filter.

### `MenuItemCard.tsx`
This component (`frontend/src/components/menu/MenuItemCard.tsx`) is responsible for rendering a single menu item. It receives a `menuItem: MenuItem` object as a prop. The card should display the `imageUrl`, `name`, `description`, and `price` of the menu item in an elegant and modern layout, consistent with the overall design. The `imageUrl` should be displayed prominently, with the name as a bold heading, description as body text, and price clearly visible.

### `MenuGrid.tsx`
This component (`frontend/src/components/menu/MenuGrid.tsx`) arranges a collection of `MenuItemCard` components in a responsive grid layout. It receives `menuItems: MenuItem[]` as a prop. It iterates over the `menuItems` array and renders a `MenuItemCard` for each item. The grid should adapt to different screen sizes, displaying an appropriate number of columns.

### `MenuPage.tsx`
This is the main page (`frontend/src/pages/MenuPage.tsx`) for displaying the restaurant's menu. It utilizes the `Layout` component from `core-frontend` for consistent navigation and footer. The page will:
1.  **Fetch Menu Data**: Use the `useMenu` hook to fetch all menu items initially. It should also manage the currently selected category using `useState` and pass it to the `useMenu` hook to refetch data when the category changes.
2.  **Category Filtering**: Render the `MenuCategoryFilter` component, passing it a list of unique categories derived from the fetched menu items and a callback to update the selected category.
3.  **Search Functionality**: Implement a search input field that filters the displayed menu items by `name` or `description` based on user input.
4.  **Display Menu Items**: Render the `MenuGrid` component, passing it the filtered and searched `MenuItem` array.
5.  **Loading and Error States**: Display appropriate loading indicators while fetching data and error messages if the API call fails.

The page structure should include a hero section with a captivating image and a headline like "Our Exquisite Menu" with a subheadline "A Culinary Journey Awaits". The menu items should be presented in a clean, spacious layout, emphasizing high-resolution food photography. The categories should be displayed prominently, allowing for easy navigation.

## Page Sections and Content for `MenuPage.tsx`

### Hero Section
- **Background Image**: `url('https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=1920&q=80')` with a `bg-black bg-opacity-50` overlay.
- **Headline**: `<h1 className="text-4xl md:text-6xl font-bold text-white">Our Exquisite Menu</h1>`
- **Subheadline**: `<p className="mt-4 text-xl text-white">A Culinary Journey Awaits at Circuit House</p>`

### Menu Section
- **Heading**: `<h2 className="text-3xl font-bold text-[#1A202C] mb-8">Discover Our Dishes</h2>`
- **Category Filter**: `MenuCategoryFilter` component.
- **Search Input**: A text input for searching menu items.
- **Menu Grid**: `MenuGrid` component displaying `MenuItemCard`s.

All components will adhere to the design tokens for colors, typography, and spacing to maintain a consistent and elegant user experience.

---

## Reservation Booking (Frontend)

**Name:** `reservation-booking-frontend`  
**Type:** FRONTEND  
**Change required:** true

**Files in this feature:**
- `frontend/src/services/reservationService.ts` — SERVICE layer — provides asynchronous functions to interact with the backend reservation API, specifically createReservation(reservationData: CreateReservationRequest): Promise<ReservationResponse>.
- `frontend/src/hooks/useReservations.ts` — HOOK layer — provides a React Query hook `useCreateReservation()` for creating new reservations, managing loading, error, and success states.
- `frontend/src/types/reservation.ts` — Generated from the backend API contract — defines TypeScript types for reservation data transfer objects.
- `frontend/src/pages/ReservationPage.tsx` — PAGE layer — orchestrates the ReservationForm and ReservationSuccessDialog components to provide a complete reservation booking experience.
- `frontend/src/components/reservation/ReservationForm.tsx` — COMPONENT layer — provides the form for users to input reservation details and submit them using the `useCreateReservation` hook.
- `frontend/src/components/reservation/ReservationSuccessDialog.tsx` — COMPONENT layer — displays a modal dialog confirming a successful reservation with its details.

**Feature Instruction:**

## Design Tokens
- Navbar: bg-[#1A202C] text-white
- Primary CTA: bg-[#D69E2E] hover:bg-[#c08e2a] text-white font-semibold rounded-full px-8 py-3 transition-all duration-200
- Brand text accent: text-[#D69E2E]
- Section bg: bg-[#F7FAFC] (odd sections) / bg-white (even sections)
- Card: bg-white rounded-xl shadow-md border border-gray-100 p-6
- Section container: <section className="py-16 px-4"><div className="max-w-7xl mx-auto">
- Hero h1: text-4xl md:text-6xl font-bold text-white
- Body: text-[#2D3748] leading-relaxed

This feature provides the frontend functionality for customers to book reservations at Circuit House. It consists of a service, a React Query hook, type definitions, a reservation page, a reservation form component, and a success dialog component.

`reservation.ts` defines the TypeScript interfaces for `CreateReservationRequest` and `ReservationResponse`, mirroring the backend DTOs from the `reservation-system-backend` feature. These types ensure strong typing throughout the frontend application when handling reservation data.

`reservationService.ts` acts as the data access layer, providing asynchronous functions to interact with the backend reservation API. It uses the `apiClient` from `@/api/client` to make HTTP requests. Specifically, it exposes `createReservation(reservationData: CreateReservationRequest): Promise<ReservationResponse>` which sends a POST request to `/api/v1/reservations`.

`useReservations.ts` is a React Query hook that leverages `reservationService.ts` to manage reservation-related data. It exports `useCreateReservation()`, which provides a `mutate` function to submit new reservation requests. This hook handles loading, error, and success states, and can be used by components to trigger reservation creation and react to its outcomes.

`ReservationForm.tsx` is a reusable component that renders the form fields for collecting reservation details such as `customerName`, `customerEmail`, `customerPhone`, `reservationTime`, `numberOfGuests`, and `notes`. It uses `react-hook-form` for form management and validation. Upon submission, it calls the `mutate` function from `useCreateReservation` hook. It also receives an `onSuccess` callback prop which is invoked when a reservation is successfully created.

`ReservationSuccessDialog.tsx` is a modal component that displays a confirmation message to the user after a successful reservation. It receives `isOpen` and `onClose` props to control its visibility and `reservationDetails` of type `ReservationResponse` to display the confirmed reservation information.

`ReservationPage.tsx` is the main page for booking reservations. It uses the `Layout` component from `core-frontend` for consistent navigation and footer. This page orchestrates the `ReservationForm` and `ReservationSuccessDialog` components. When the `ReservationForm` successfully creates a reservation, `ReservationPage` will open the `ReservationSuccessDialog` to show the confirmation details. The page layout should be clean and spacious, with a prominent heading "Book Your Table at Circuit House" and a sub-heading "Experience our graceful ambiance and exquisite dining. Reserve your spot now." The form itself should be centered and visually appealing, reflecting the elegant and modern design direction. The background of the page should use `bg-[#F7FAFC]`.

**Interaction Flow:**
1. `ReservationPage.tsx` renders the `ReservationForm.tsx` component.
2. The user fills out the form in `ReservationForm.tsx` and submits it.
3. `ReservationForm.tsx` calls the `mutate` function provided by `useCreateReservation()` from `useReservations.ts`.
4. `useReservations.ts` internally calls `reservationService.ts`'s `createReservation` function.
5. `reservationService.ts` sends a POST request to `/api/v1/reservations` on the `reservation-system-backend` with the `CreateReservationRequest` payload.
6. Upon a successful response, `useReservations.ts` triggers the `onSuccess` callback provided to `useCreateReservation` in `ReservationForm.tsx`.
7. `ReservationForm.tsx` then calls the `onSuccess` prop passed from `ReservationPage.tsx`.
8. `ReservationPage.tsx` receives the successful reservation response and opens the `ReservationSuccessDialog.tsx`, passing the `ReservationResponse` data to it.
9. The `ReservationSuccessDialog.tsx` displays the confirmation to the user.

**Error Handling:**
If `reservationService.ts` encounters an error during the API call (e.g., network issue, backend validation error), it will throw an error. This error will be caught by `useReservations.ts` and made available to `ReservationForm.tsx` via the `isError` and `error` properties of the `useCreateReservation` hook. The `ReservationForm.tsx` should display appropriate error messages to the user.


---

## Online Ordering Flow (Frontend)

**Name:** `order-flow-frontend`  
**Type:** FRONTEND  
**Change required:** true

**Files in this feature:**
- `frontend/src/services/orderService.ts` — SERVICE layer — provides functions for interacting with the order-related backend endpoints, specifically `createOrder(orderData: CreateOrderRequest): Promise<OrderResponse>`.
- `frontend/src/hooks/useOrders.ts` — React Query hook for creating and managing online order data, exposing `useCreateOrder()` for submitting new orders.
- `frontend/src/types/order.ts` — Generated from the backend API contract — defines TypeScript types and interfaces for order and order item data.
- `frontend/src/context/CartContext.tsx` — React context for managing the user's shopping cart state, exposing `CartProvider` and the cart state (`cartItems`, `cartTotal`, `itemCount`) and actions (`addItemToCart`, `updateItemQuantity`, `removeItemFromCart`, `clearCart`).
- `frontend/src/services/local/cartService.ts` — Local service to persist and retrieve the shopping cart from localStorage, providing functions like `getCartItems()`, `addCartItem(item: CartItem)`, `updateCartItemQuantity(menuItemId: string, quantity: number)`, `removeCartItem(menuItemId: string)`, and `clearCart()`.
- `frontend/src/pages/OrderPage.tsx` — Multi-step page for the online ordering and checkout process, orchestrating `CartView`, `CheckoutForm`, and `PaymentComponent`.
- `frontend/src/components/order/CartView.tsx` — Component that displays the items currently in the shopping cart, consuming `CartContext` for cart data and actions.
- `frontend/src/components/order/CheckoutForm.tsx` — Form for collecting customer details (name, address, phone) during checkout, emitting collected data on submission.
- `frontend/src/components/order/OrderSummary.tsx` — Displays a summary of the order total, taxes, and delivery fees, consuming `CartContext` for the cart total.
- `frontend/src/components/order/PaymentComponent.tsx` — Component that integrates with the payment gateway to handle the payment process, using `useCreateOrder` to submit the order to the backend.

**Feature Instruction:**

## Design Tokens
- Navbar: bg-[#1A202C] text-white
- Primary CTA: bg-[#D69E2E] hover:bg-[#c28b29] text-white font-semibold rounded-full px-8 py-3 transition-all duration-200
- Brand text accent: text-[#D69E2E]
- Section bg: bg-[#F7FAFC] (odd sections) / bg-white (even sections)
- Card: bg-white rounded-xl shadow-md border border-gray-100 p-6
- Section container: <section className="py-16 px-4"><div className="max-w-7xl mx-auto">
- Hero h1: text-4xl md:text-6xl font-bold text-white
- Body: text-[#2D3748] leading-relaxed

This feature implements the frontend for the online ordering flow for Circuit House, allowing customers to add menu items to a cart, provide their details, and initiate payment. It consists of a local cart management service, a React context for the cart state, a service for interacting with the backend order API, a React Query hook for order creation, and several UI components culminating in the `OrderPage.tsx`.

### Data Structures (`frontend/src/types/order.ts`)
This file defines the TypeScript interfaces for `OrderItem`, `CartItem`, `CreateOrderRequest`, and `OrderResponse` to ensure type safety across the frontend. `OrderItem` represents an item within an order, `CartItem` extends `OrderItem` with a `menuItem` object for display purposes, `CreateOrderRequest` is the payload sent to the backend for order creation, and `OrderResponse` is the expected response from the backend after an order is created.

### Local Cart Service (`frontend/src/services/local/cartService.ts`)
`cartService.ts` provides utility functions to manage the shopping cart in `localStorage`. It exports `getCartItems()`, `addCartItem(item: CartItem)`, `updateCartItemQuantity(menuItemId: string, quantity: number)`, `removeCartItem(menuItemId: string)`, and `clearCart()`. These functions interact directly with `localStorage` to persist the cart state, ensuring items are retained even if the user navigates away or refreshes the page.

### Cart Context (`frontend/src/context/CartContext.tsx`)
`CartContext.tsx` creates a React Context (`CartContext`) that provides the cart state and actions to its consumers. It uses `cartService` to manage the underlying `localStorage` persistence. The `CartProvider` component wraps the application (or relevant parts) and exposes `cartItems: CartItem[]`, `addItemToCart(item: MenuItem, quantity: number)`, `updateItemQuantity(menuItemId: string, quantity: number)`, `removeItemFromCart(menuItemId: string)`, `clearCart()`, `cartTotal: number`, and `itemCount: number`. The `addItemToCart` function takes a `MenuItem` and a `quantity`, converting it into a `CartItem` before adding it to the cart.

### Order Service (`frontend/src/services/orderService.ts`)
`orderService.ts` is responsible for making API calls to the `order-management-backend`. It exports an asynchronous function `createOrder(orderData: CreateOrderRequest): Promise<OrderResponse>` which sends a POST request to `/api/v1/orders`. This service acts as a wrapper around the `apiClient` to handle order-specific requests.

### Order Hook (`frontend/src/hooks/useOrders.ts`)
`useOrders.ts` provides a React Query mutation hook, `useCreateOrder()`, for creating new orders. This hook leverages `orderService.createOrder` and manages the loading, error, and success states of the order creation process. Upon successful order creation, it should clear the local cart using `CartContext.clearCart()` and navigate the user to an order confirmation or payment success page. It returns an object containing `mutate` (the function to trigger the order creation), `isLoading`, `isError`, `isSuccess`, and `error`.

### Order Page (`frontend/src/pages/OrderPage.tsx`)
`OrderPage.tsx` is the main entry point for the online ordering flow. It is a multi-step page that guides the user through viewing their cart, entering delivery details, and making a payment. It uses `Layout` from `core-frontend` for consistent navigation and footer. The page maintains its own state for the current step (e.g., 'cart', 'details', 'payment', 'confirmation').

**Sections:**
1.  **Cart View:** Displays the `CartView` component, allowing users to review and modify items in their cart. Includes a prominent CTA to proceed to checkout.
2.  **Checkout Details:** Displays the `CheckoutForm` component to collect customer name, email, phone, and delivery address. Includes a CTA to proceed to payment.
3.  **Payment:** Displays the `PaymentComponent` which integrates with the payment gateway. This step will call `useCreateOrder` to submit the order to the backend, then initiate the payment process.
4.  **Order Confirmation:** A simple confirmation message after successful payment, potentially showing a link to view order status (future feature).

The `OrderPage` orchestrates the flow, passing necessary data and callbacks between these steps and utilizing the `CartContext` and `useCreateOrder` hook.

### Cart View Component (`frontend/src/components/order/CartView.tsx`)
`CartView.tsx` displays the contents of the user's shopping cart. It consumes the `CartContext` to access `cartItems`, `updateItemQuantity`, `removeItemFromCart`, and `cartTotal`. Each `CartItem` is displayed with its name, quantity, price, and an image. Users can adjust quantities or remove items. It also includes the `OrderSummary` component at the bottom.

### Checkout Form Component (`frontend/src/components/order/CheckoutForm.tsx`)
`CheckoutForm.tsx` is a form for collecting customer details required for an order: `customerName`, `customerEmail`, `customerPhone`, and `deliveryAddress`. It should include basic client-side validation for these fields. Upon submission, it should emit an event or call a prop function with the collected data, which `OrderPage` will then use to construct the `CreateOrderRequest`.

### Order Summary Component (`frontend/src/components/order/OrderSummary.tsx`)
`OrderSummary.tsx` displays a breakdown of the order costs. It consumes `CartContext` to get the `cartTotal`. It should calculate and display `Subtotal`, `Delivery Fee` (a static placeholder of 50.00 for now), and `Total Amount`. The `Total Amount` will be `cartTotal + Delivery Fee`.

### Payment Component (`frontend/src/components/order/PaymentComponent.tsx`)
`PaymentComponent.tsx` is responsible for initiating the payment process. It receives the `CreateOrderRequest` data (customer details and cart items) from `OrderPage`. When the user clicks 'Pay Now', it first calls the `mutate` function from `useCreateOrder` to create the order in the backend. Upon successful order creation, it will receive an `OrderResponse` which includes `paymentGatewayOrderId`. This `paymentGatewayOrderId` and the `totalAmount` from the `OrderResponse` will then be used to initiate the actual payment via a payment gateway (e.g., Razorpay, simulated for now). After successful payment, it should clear the cart and navigate to a confirmation step.

## Inter-file Wiring
- `OrderPage.tsx` renders `CartView.tsx`, `CheckoutForm.tsx`, `OrderSummary.tsx`, and `PaymentComponent.tsx`.
- `OrderPage.tsx` uses `CartContext` to get cart details and `useCreateOrder` to submit the order.
- `CartView.tsx` and `OrderSummary.tsx` consume `CartContext`.
- `PaymentComponent.tsx` uses `useCreateOrder` to create the order.
- `useOrders.ts` calls `orderService.createOrder`.
- `orderService.ts` uses `apiClient` to make HTTP requests.
- `CartContext.tsx` uses `cartService.ts` for local storage operations.
- `cartService.ts` uses types from `order.ts`.
- `order.ts` imports `MenuItem` from `menu.ts` (from `menu-display-frontend` feature).

## Cross-Feature Contracts
- This feature calls the `order-management-backend`'s `POST /api/v1/orders` endpoint via `orderService.createOrder`.
- It consumes `MenuItem` types from `menu-display-frontend` via `frontend/src/types/menu.ts`.
- It uses the `Layout` component from `core-frontend`.
- It uses the `apiClient` from `frontend/src/api/client.ts` (from `infrastructure` feature).

## Authentication Token
The JWT token is stored in `localStorage` under the key 'token'. `apiClient` reads this token for authenticated requests. This feature's `orderService` will implicitly use this token via `apiClient` for the `createOrder` call, as order creation is an authenticated action.


---

## Event Display (Frontend)

**Name:** `event-display-frontend`  
**Type:** FRONTEND  
**Change required:** true

**Files in this feature:**
- `frontend/src/services/eventService.ts` — SERVICE layer — provides functions for interacting with the event-related backend endpoints, specifically `getUpcomingEvents(): Promise<Event[]>`.
- `frontend/src/hooks/useEvents.ts` — React Query hook for fetching and managing event data, exposing `useEvents(): { data: Event[] | undefined, isLoading: boolean, isError: boolean, error: Error | null }`.
- `frontend/src/types/event.ts` — Generated from the backend API contract — defines the TypeScript interface for event data.
- `frontend/src/pages/EventsPage.tsx` — PAGE layer — orchestrates the display of upcoming events, using `useEvents` to fetch data and `EventList` to render them.
- `frontend/src/components/events/EventList.tsx` — COMPONENT layer — displays a list or grid of `EventCard` components, accepting `events: Event[]` as props.
- `frontend/src/components/events/EventCard.tsx` — COMPONENT layer — displays the details of a single event in a card format, accepting `event: Event` as props.

**Feature Instruction:**

## Design Tokens
- Navbar: bg-[#1A202C] text-white
- Primary CTA: bg-[#D69E2E] hover:bg-[#c28b27] text-white font-semibold rounded-full px-8 py-3 transition-all duration-200
- Brand text accent: text-[#D69E2E]
- Section bg: bg-[#F7FAFC] (odd sections) / bg-white (even sections)
- Card: bg-white rounded-xl shadow-md border border-gray-100 p-6
- Section container: <section className="py-16 px-4"><div className="max-w-7xl mx-auto">
- Hero h1: text-4xl md:text-6xl font-bold text-white
- Body: text-[#2D3748] leading-relaxed

This feature provides a public-facing page to display upcoming events at Circuit House. It consists of `EventsPage.tsx` which orchestrates the display, `EventList.tsx` for rendering a collection of events, and `EventCard.tsx` for individual event details. Data is fetched via `useEvents.ts` hook, which in turn uses `eventService.ts` to interact with the backend API. The `event.ts` file defines the TypeScript types for event data.

### Data Flow:
1. `EventsPage.tsx` uses the `useEvents` hook to fetch a list of upcoming events.
2. `useEvents.ts` calls `eventService.ts`'s `getUpcomingEvents` function.
3. `eventService.ts` makes an HTTP GET request to the `/api/v1/events` endpoint of the `event-management-backend`.
4. The fetched `EventDto` objects are typed using the interfaces defined in `event.ts`.
5. `EventsPage.tsx` passes the fetched events to `EventList.tsx`.
6. `EventList.tsx` iterates over the events and renders an `EventCard.tsx` for each event.
7. `EventCard.tsx` displays the details of a single event.

### File Interactions:
- `EventsPage.tsx` imports `Layout`, `useEvents`, and `EventList`.
- `useEvents.ts` imports `eventService` and `Event` (from `event.ts`).
- `eventService.ts` imports `apiClient` (from `frontend/src/api/client.ts`) and `Event` (from `event.ts`).
- `EventList.tsx` imports `EventCard` and `Event` (from `event.ts`).
- `EventCard.tsx` imports `Event` (from `event.ts`).

### `eventService.ts`
This service provides the `getUpcomingEvents` function to fetch event data from the backend.

#### `getUpcomingEvents(): Promise<Event[]>`
1. Makes a GET request to `/api/v1/events` using the `apiClient`.
2. Returns a `Promise` that resolves to an array of `Event` objects.
3. Throws an error if the API call fails.

### `useEvents.ts`
This React Query hook provides a convenient way to fetch and manage event data.

#### `useEvents(): { data: Event[] | undefined, isLoading: boolean, isError: boolean, error: Error | null }`
1. Uses `react-query`'s `useQuery` hook.
2. The query key is `['events', 'upcoming']`.
3. The query function calls `eventService.getUpcomingEvents()`.
4. Returns an object containing `data` (list of `Event` objects), `isLoading` (boolean), `isError` (boolean), and `error` (Error object or null).

### `event.ts`
Defines the `Event` interface, mirroring the `EventDto` from the `event-management-backend`.

### `EventsPage.tsx`
This page displays all upcoming events. It uses the `Layout` component for consistent navigation and footer, and the `useEvents` hook to fetch data. It renders a hero section, a main content area with a heading, and the `EventList` component.

**Page Structure:**
- Wraps content in `<Layout>`.
- **Hero Section:**
  - Background image: `https://images.unsplash.com/photo-1497366216548-37526070297c?w=1920&q=80` with a `bg-black bg-opacity-50` overlay.
  - `h1` with text "Experience the Best at Circuit House Events" (text-4xl md:text-6xl font-bold text-white).
  - `p` with text "Join us for unforgettable live music, special dining experiences, and more." (text-xl text-white mt-4).
- **Events Section:**
  - `h2` with text "Upcoming Events" (text-3xl font-bold text-[#1A202C] mb-8).
  - Displays a loading spinner if `isLoading` is true.
  - Displays an error message if `isError` is true.
  - Renders `EventList` with the fetched events if `data` is available.
  - Displays a message "No upcoming events found." if `data` is empty.

### `EventList.tsx`
This component receives an array of `Event` objects and renders them using `EventCard` components. It should display events in a responsive grid layout.

#### `EventList({ events }: { events: Event[] })`
1. Receives an array of `Event` objects as props.
2. Renders a grid of `EventCard` components, mapping each event to a card.
3. Uses Tailwind CSS for a responsive grid (e.g., `grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8`).

### `EventCard.tsx`
This component displays the details of a single event in a card format.

#### `EventCard({ event }: { event: Event })`
1. Receives a single `Event` object as props.
2. Displays the event's `imageUrl`, `name`, `date`, `time`, and `description`.
3. Uses the design tokens for card styling (bg-white rounded-xl shadow-md border border-gray-100 p-6).
4. Formats `date` and `time` for readability (e.g., "MMMM DD, YYYY" and "hh:mm A").

---

## Admin Portal (Frontend)

**Name:** `admin-portal-frontend`  
**Type:** FRONTEND  
**Change required:** true

**Files in this feature:**
- `frontend/src/pages/AdminDashboardPage.tsx` — PAGE layer — the main dashboard for the admin area, providing an overview and navigation.
- `frontend/src/pages/AdminMenuPage.tsx` — PAGE layer — orchestrates menu item management using MenuTable, MenuItemForm, and DeleteMenuItemDialog, interacting with the useMenu hook.
- `frontend/src/components/admin/menu/MenuTable.tsx` — COMPONENT layer — displays a table of menu items with actions for editing and deleting.
- `frontend/src/components/admin/menu/MenuItemForm.tsx` — COMPONENT layer — provides a form for creating or updating menu items.
- `frontend/src/components/admin/menu/DeleteMenuItemDialog.tsx` — COMPONENT layer — a confirmation dialog for deleting a menu item.
- `frontend/src/pages/AdminReservationsPage.tsx` — PAGE layer — orchestrates reservation management using ReservationsTable and UpdateReservationStatusForm, interacting with the useReservations hook.
- `frontend/src/components/admin/reservations/ReservationsTable.tsx` — COMPONENT layer — displays a table of reservations with options to update status.
- `frontend/src/components/admin/reservations/UpdateReservationStatusForm.tsx` — COMPONENT layer — provides a form to update the status of a reservation.
- `frontend/src/pages/AdminOrdersPage.tsx` — PAGE layer — orchestrates order management using OrdersTable and OrderDetailView, interacting with the useOrders hook.
- `frontend/src/components/admin/orders/OrdersTable.tsx` — COMPONENT layer — displays a table of online orders with an option to view details.
- `frontend/src/components/admin/orders/OrderDetailView.tsx` — COMPONENT layer — displays a detailed view of a single order.
- `frontend/src/pages/AdminEventsPage.tsx` — PAGE layer — orchestrates event management using EventsTable, EventForm, and DeleteEventDialog, interacting with the useEvents hook.
- `frontend/src/components/admin/events/EventsTable.tsx` — COMPONENT layer — displays a table of events with actions for editing and deleting.
- `frontend/src/components/admin/events/EventForm.tsx` — COMPONENT layer — provides a form for creating or updating events.
- `frontend/src/components/admin/events/DeleteEventDialog.tsx` — COMPONENT layer — a confirmation dialog for deleting a special event.

**Feature Instruction:**

## Design Tokens
- Navbar: bg-[#1A202C] text-white
- Primary CTA: bg-[#D69E2E] hover:bg-[#B78822] text-white font-semibold rounded-full px-8 py-3 transition-all duration-200
- Brand text accent: text-[#D69E2E]
- Section bg: bg-[#F7FAFC] (odd sections) / bg-white (even sections)
- Card: bg-white rounded-xl shadow-md border border-gray-100 p-6
- Section container: <section className="py-16 px-4"><div className="max-w-7xl mx-auto">
- Hero h1: text-4xl md:text-6xl font-bold text-white
- Body: text-[#2D3748] leading-relaxed

This feature implements the administrative interface for Circuit House, providing pages and components for managing the restaurant's menu, reservations, orders, and special events. All admin pages are wrapped in the `AdminLayout` component from the `core-frontend` feature, which provides the consistent sidebar navigation and overall layout. Each page utilizes specific `use` hooks from `menu-display-frontend`, `reservation-booking-frontend`, `order-flow-frontend`, and `event-display-frontend` to interact with the backend APIs for data fetching and mutations.

### AdminDashboardPage.tsx
This page serves as the entry point for the admin portal, displaying a welcoming message and potentially summary statistics (though initial implementation will be basic). It uses the `AdminLayout` for its structure.

### AdminMenuPage.tsx
This page allows administrators to manage menu items. It orchestrates the `MenuTable`, `MenuItemForm`, and `DeleteMenuItemDialog` components. It uses the `useMenu` hook from `menu-display-frontend` to fetch, create, update, and delete menu items. The page will display a table of existing menu items. When an admin wants to add a new item or edit an existing one, a modal containing `MenuItemForm` will appear. Deletion will trigger `DeleteMenuItemDialog` for confirmation.

### MenuTable.tsx
This component displays a paginated and sortable table of `MenuItemDto` objects. It receives `menuItems`, `onEditMenuItem`, and `onDeleteMenuItem` as props. It renders each menu item with its details (name, description, price, category, image URL) and provides action buttons for editing and deleting.

### MenuItemForm.tsx
This component provides a form for creating or updating a `MenuItemDto`. It takes an optional `initialData` prop for editing existing items and an `onSubmit` prop to handle form submission. It uses the `useMenu` hook's `createMenuItem` and `updateMenuItem` functions. The form includes fields for `name`, `description`, `price`, `category`, and `imageUrl`.

### DeleteMenuItemDialog.tsx
This component is a confirmation dialog for deleting a menu item. It receives `isOpen`, `onClose`, and `onConfirmDelete` as props. When confirmed, it calls the `useMenu` hook's `deleteMenuItem` function.

### AdminReservationsPage.tsx
This page enables administrators to view and manage customer reservations. It integrates `ReservationsTable` and `UpdateReservationStatusForm`. It uses the `useReservations` hook from `reservation-booking-frontend` to fetch all reservations and update their statuses. The page will display a table of reservations. An admin can update the status of a reservation (e.g., confirm, cancel) using the `UpdateReservationStatusForm`.

### ReservationsTable.tsx
This component displays a table of `ReservationResponse` objects. It receives `reservations` and `onUpdateStatus` as props. It shows reservation details like customer name, email, phone, time, number of guests, and current status. It provides an action to update the reservation status.

### UpdateReservationStatusForm.tsx
This component provides a form or set of actions to update the status of a specific reservation. It takes `reservationId`, `currentStatus`, and `onStatusUpdate` as props. It uses the `useReservations` hook's `updateReservationStatus` function.

### AdminOrdersPage.tsx
This page allows administrators to view and manage online orders. It uses `OrdersTable` and `OrderDetailView`. It leverages the `useOrders` hook from `order-flow-frontend` to fetch all orders and retrieve details for a specific order. The page will display a table of orders. Clicking on an order will open `OrderDetailView` to show its full details.

### OrdersTable.tsx
This component displays a table of `OrderResponse` objects. It receives `orders` and `onViewOrderDetails` as props. It shows order details like customer name, total amount, order time, and status. It provides an action to view detailed information for an order.

### OrderDetailView.tsx
This component displays a detailed view of a single `OrderResponse`, typically in a modal or side panel. It receives `orderId` and `onClose` as props. It fetches the specific order details using the `useOrders` hook's `getOrderById` function and displays all items, customer information, and order status.

### AdminEventsPage.tsx
This page is for administrators to manage special events. It combines `EventsTable`, `EventForm`, and `DeleteEventDialog`. It uses the `useEvents` hook from `event-display-frontend` to fetch, create, update, and delete events. The page will display a table of existing events. Adding or editing an event will open a modal with `EventForm`. Deleting an event will trigger `DeleteEventDialog` for confirmation.

### EventsTable.tsx
This component displays a table of `EventDto` objects. It receives `events`, `onEditEvent`, and `onDeleteEvent` as props. It renders each event with its details (name, description, date, time, image URL, active status) and provides action buttons for editing and deleting.

### EventForm.tsx
This component provides a form for creating or updating an `EventDto`. It takes an optional `initialData` prop for editing existing events and an `onSubmit` prop to handle form submission. It uses the `useEvents` hook's `createEvent` and `updateEvent` functions. The form includes fields for `name`, `description`, `date`, `time`, `imageUrl`, and `active` status.

### DeleteEventDialog.tsx
This component is a confirmation dialog for deleting a special event. It receives `isOpen`, `onClose`, and `onConfirmDelete` as props. When confirmed, it calls the `useEvents` hook's `deleteEvent` function.

---

## Infrastructure

**Name:** `infrastructure`  
**Type:** INFRA  
**Change required:** true

**Feature Instruction:**

_Not enriched (INFRA or skipped)._

---

