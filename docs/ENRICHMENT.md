# Feature Enrichment — Attempt 1

Generated: 2026-07-25

Each section is one LLM call (~5–8K tokens). The instruction tells the generator how all files in the feature interact and what contracts they must honour.

---

## Shared Backend

**Name:** `shared-backend`  
**Type:** SHARED  
**Change required:** true

**Files in this feature:**
- `backend/src/main/java/com/circuithouse/model/User.java` — MODEL layer — defines the User entity with fields for authentication and authorization, including username, password, and roles.
- `backend/src/main/java/com/circuithouse/model/Role.java` — MODEL layer — defines the Role entity for role-based access control, with a name (e.g., ADMIN, CUSTOMER).
- `backend/src/main/java/com/circuithouse/repository/UserRepository.java` — REPOSITORY layer — provides data access operations for the User entity, including finding a user by username.
- `backend/src/main/java/com/circuithouse/service/UserService.java` — SERVICE layer — implements Spring Security's UserDetailsService to load user details for authentication via loadUserByUsername(String username).
- `backend/src/main/java/com/circuithouse/dto/AuthRequest.java` — DTO layer — represents the request body for user login, containing username and password.
- `backend/src/main/java/com/circuithouse/dto/AuthResponse.java` — DTO layer — represents the response body for authentication, containing the JWT token.
- `backend/src/main/java/com/circuithouse/controller/AuthController.java` — CONTROLLER layer — exposes the /api/v1/auth/login endpoint for user authentication.
- `backend/src/main/java/com/circuithouse/config/SecurityConfig.java` — CONFIG layer — configures Spring Security, defining the security filter chain, password encoder, and authentication manager.
- `backend/src/main/java/com/circuithouse/util/JwtUtil.java` — UTIL layer — provides methods for generating, parsing, and validating JWT tokens.
- `backend/src/main/java/com/circuithouse/security/JwtAuthFilter.java` — CONFIG layer — a servlet filter that intercepts requests to validate JWT tokens and set the Spring Security context.
- `backend/src/main/java/com/circuithouse/controller/SpaController.java` — CONTROLLER layer — forwards all non-API, non-static requests to /index.html to enable client-side routing for the SPA.
- `backend/src/main/java/com/circuithouse/config/AdminInitializer.java` — CONFIG layer — initializes a default admin user on application startup if no users exist in the database.
- `backend/src/main/java/com/circuithouse/config/DataSeeder.java` — CONFIG layer — populates the database with initial sample data for development and demonstration purposes.
- `backend/src/main/java/com/circuithouse/exception/GlobalExceptionHandler.java` — EXCEPTION layer — provides centralized exception handling for the application, returning consistent ErrorResponse DTOs.
- `backend/src/main/java/com/circuithouse/dto/ErrorResponse.java` — DTO layer — defines the standard structure for API error responses, including status, message, and timestamp.
- `backend/src/main/java/com/circuithouse/exception/ResourceNotFoundException.java` — EXCEPTION layer — a custom exception indicating that a requested resource could not be found.

**Feature Instruction:**

The `shared-backend` feature provides foundational components for user authentication, authorization, and general application utilities. It includes user and role models, a repository for user data, a service for loading user details for Spring Security, and DTOs for authentication requests and responses. The `AuthController` handles user login, issuing JWT tokens upon successful authentication. Security is configured in `SecurityConfig`, which integrates `JwtAuthFilter` to validate tokens on incoming requests. `JwtUtil` provides the core JWT generation and validation logic. An `AdminInitializer` ensures a default admin user exists on startup, and `DataSeeder` can populate the database with sample data. `SpaController` enables client-side routing for the React frontend by forwarding non-API requests to `index.html`. Global exception handling is provided by `GlobalExceptionHandler` to ensure consistent error responses using `ErrorResponse` DTOs, and `ResourceNotFoundException` is a custom exception for when resources are not found.

### Authentication Flow
1. A client sends an `AuthRequest` (username and password) to the `POST /api/v1/auth/login` endpoint handled by `AuthController`.
2. `AuthController` uses `AuthenticationManager` to authenticate the user. If successful, it calls `JwtUtil.generateToken()` to create a JWT.
3. The generated JWT is returned to the client within an `AuthResponse`.
4. For subsequent authenticated requests, the client includes the JWT in the `Authorization` header as a Bearer token.
5. `JwtAuthFilter` intercepts these requests, extracts and validates the JWT using `JwtUtil.validateToken()` and `JwtUtil.extractUsername()`.
6. If the token is valid, `JwtAuthFilter` loads user details via `UserService.loadUserByUsername()` and sets the `SecurityContext`.
7. The request then proceeds to the appropriate controller, with the user's authentication context available.

### User and Role Management
- `User` and `Role` entities define the structure for user accounts and their associated roles (e.g., `ADMIN`, `CUSTOMER`).
- `UserRepository` provides standard CRUD operations for `User` entities.
- `UserService` implements `UserDetailsService` to integrate with Spring Security, loading `User` objects by username.
- `AdminInitializer` creates a default admin user if no users exist in the database on application startup, ensuring initial access to the admin portal.

### Exception Handling
- `GlobalExceptionHandler` catches specific exceptions like `ResourceNotFoundException` and returns a standardized `ErrorResponse` with an appropriate HTTP status code (e.g., 404 Not Found).
- `ResourceNotFoundException` is a custom exception that services can throw when a requested entity is not found.

### SPA Routing
- `SpaController` ensures that any request not matching `/api/**` or static assets is forwarded to `/index.html`, allowing the React application to handle client-side routing.

---

## Menu Management

**Name:** `menu-management`  
**Type:** BACKEND  
**Change required:** true

**Files in this feature:**
- `backend/src/main/java/com/circuithouse/model/MenuItem.java` — MODEL layer — defines the structure and relationships for a menu item entity.
- `backend/src/main/java/com/circuithouse/model/MenuItemCategory.java` — MODEL layer — defines the structure for a menu item category entity.
- `backend/src/main/java/com/circuithouse/repository/MenuItemRepository.java` — REPOSITORY layer — provides data access operations for MenuItem entities, including custom queries to find active items by category.
- `backend/src/main/java/com/circuithouse/repository/MenuItemCategoryRepository.java` — REPOSITORY layer — provides data access operations for MenuItemCategory entities.
- `backend/src/main/java/com/circuithouse/dto/MenuItemDto.java` — DTO layer — serves as a data transfer object for menu item data between the service and controller layers.
- `backend/src/main/java/com/circuithouse/service/MenuService.java` — SERVICE layer — implements business logic for managing menu items and categories, converting between entities and DTOs.
- `backend/src/main/java/com/circuithouse/controller/MenuController.java` — CONTROLLER layer — exposes public API endpoints for customers to view the restaurant's menu and categories.
- `backend/src/main/java/com/circuithouse/controller/AdminMenuController.java` — CONTROLLER layer — exposes admin-only API endpoints for CRUD operations on menu items and categories.

**Feature Instruction:**

The Menu Management feature provides a complete backend solution for managing Circuit House's menu items and categories. It includes data models for `MenuItem` and `MenuItemCategory`, repositories for persistence, DTOs for API communication, a service layer for business logic, and two controllers: `MenuController` for public access to the menu and `AdminMenuController` for administrative CRUD operations.

### Data Models
- `MenuItem.java`: Represents a single dish on the menu. It includes fields for `id`, `name`, `description`, `price`, `imageUrl`, `category`, and `active`. The `category` field is a many-to-one relationship with `MenuItemCategory`.
- `MenuItemCategory.java`: Represents a category for menu items (e.g., "Appetizers", "Main Courses"). It includes fields for `id`, `name`, and `description`.

### Repositories
- `MenuItemRepository.java`: Extends `JpaRepository` for `MenuItem` entities. It will include custom query methods to find menu items by category and to find all active menu items.
- `MenuItemCategoryRepository.java`: Extends `JpaRepository` for `MenuItemCategory` entities. It will include a custom query method to find all categories, potentially ordered.

### DTOs
- `MenuItemDto.java`: A DTO used for both creating/updating menu items and for returning menu item data in API responses. It mirrors the `MenuItem` entity but uses `UUID` for `id` and includes the category name directly.

### Service Layer
- `MenuService.java`: This service orchestrates interactions between the controllers and repositories. It provides the following public methods:
    - `List<MenuItemDto> getAllMenuItems()`: Retrieves all active menu items, converting them to `MenuItemDto`.
    - `List<MenuItemDto> getMenuItemsByCategory(String categoryName)`: Retrieves all active menu items belonging to a specific category, converting them to `MenuItemDto`.
    - `MenuItemDto getMenuItemById(UUID id)`: Retrieves a single menu item by its ID, converting it to `MenuItemDto`. Throws `ResourceNotFoundException` if the item does not exist.
    - `List<MenuItemCategory> getAllMenuItemCategories()`: Retrieves all menu item categories.
    - `MenuItemDto createMenuItem(MenuItemDto menuItemDto)`: Creates a new menu item. It validates the input, converts the DTO to an entity, saves it via `MenuItemRepository`, and returns the saved item as a DTO. Throws `IllegalArgumentException` if the category does not exist.
    - `MenuItemDto updateMenuItem(UUID id, MenuItemDto menuItemDto)`: Updates an existing menu item. It finds the item by ID, updates its fields from the DTO, saves it, and returns the updated item as a DTO. Throws `ResourceNotFoundException` if the item does not exist and `IllegalArgumentException` if the category does not exist.
    - `void deleteMenuItem(UUID id)`: Deletes a menu item by its ID. Throws `ResourceNotFoundException` if the item does not exist.
    - `MenuItemCategory createMenuItemCategory(MenuItemCategory category)`: Creates a new menu item category. Saves it via `MenuItemCategoryRepository`.
    - `MenuItemCategory updateMenuItemCategory(UUID id, MenuItemCategory category)`: Updates an existing menu item category. Finds the category by ID, updates its fields, saves it, and returns the updated category. Throws `ResourceNotFoundException` if the category does not exist.
    - `void deleteMenuItemCategory(UUID id)`: Deletes a menu item category by its ID. Throws `ResourceNotFoundException` if the category does not exist.

### Controllers
- `MenuController.java`: Exposes public API endpoints for customers to view the menu.
    - `GET /api/v1/menu/items`: Returns a list of all active menu items.
    - `GET /api/v1/menu/items/{id}`: Returns a single menu item by ID.
    - `GET /api/v1/menu/items/category/{categoryName}`: Returns a list of active menu items filtered by category.
    - `GET /api/v1/menu/categories`: Returns a list of all menu item categories.
- `AdminMenuController.java`: Exposes admin-only API endpoints for managing menu items and categories.
    - `POST /api/v1/admin/menu/items`: Creates a new menu item.
    - `PUT /api/v1/admin/menu/items/{id}`: Updates an existing menu item.
    - `DELETE /api/v1/admin/menu/items/{id}`: Deletes a menu item.
    - `POST /api/v1/admin/menu/categories`: Creates a new menu item category.
    - `PUT /api/v1/admin/menu/categories/{id}`: Updates an existing menu item category.
    - `DELETE /api/v1/admin/menu/categories/{id}`: Deletes a menu item category.

### Error Handling
- The controllers will catch `ResourceNotFoundException` and return an HTTP 404 Not Found status.
- The controllers will catch `IllegalArgumentException` and return an HTTP 400 Bad Request status.
- Other unhandled exceptions will result in an HTTP 500 Internal Server Error status, handled by `GlobalExceptionHandler` from the `shared-backend` feature.

---

## Reservation System

**Name:** `reservation-system`  
**Type:** BACKEND  
**Change required:** true

**Files in this feature:**
- `backend/src/main/java/com/circuithouse/model/Reservation.java` — MODEL layer — defines the `Reservation` entity with fields for reservation details and status.
- `backend/src/main/java/com/circuithouse/model/ReservationStatus.java` — MODEL layer — enum defining the lifecycle states of a reservation.
- `backend/src/main/java/com/circuithouse/repository/ReservationRepository.java` — REPOSITORY layer — provides data access operations for `Reservation` entities, including `findByReservationTimeBetween` and `findByCustomerEmail`.
- `backend/src/main/java/com/circuithouse/dto/ReservationDto.java` — DTO layer — represents a reservation for API responses, exposing `id`, `reservationTime`, `partySize`, `customerName`, `customerEmail`, `customerPhone`, and `status`.
- `backend/src/main/java/com/circuithouse/dto/CreateReservationRequest.java` — DTO layer — used for creating new reservations, requiring `reservationTime`, `partySize`, `customerName`, `customerEmail`, and `customerPhone`.
- `backend/src/main/java/com/circuithouse/service/ReservationService.java` — SERVICE layer — implements `createReservation(CreateReservationRequest)`, `getReservationById(UUID)`, `getAllReservations()`, `getReservationsByStatus(ReservationStatus)`, `updateReservationStatus(UUID, ReservationStatus)`, and `deleteReservation(UUID)`.
- `backend/src/main/java/com/circuithouse/controller/ReservationController.java` — CONTROLLER layer — exposes public API endpoints for customers to `POST /api/v1/reservations` and `GET /api/v1/reservations/{id}`.
- `backend/src/main/java/com/circuithouse/controller/AdminReservationController.java` — CONTROLLER layer — exposes admin-only API endpoints for `GET /api/v1/admin/reservations`, `GET /api/v1/admin/reservations/status/{status}`, `PUT /api/v1/admin/reservations/{id}/status`, and `DELETE /api/v1/admin/reservations/{id}`.

**Feature Instruction:**

The Reservation System feature provides the backend logic and API endpoints for managing customer table reservations at Circuit House. It includes models for `Reservation` and `ReservationStatus`, DTOs for creating and retrieving reservations, a repository for data access, and services and controllers for handling business logic and exposing RESTful APIs.

### Data Models

1.  **Reservation.java**: This JPA entity represents a single table reservation. It stores details such as a unique `UUID id`, the `LocalDateTime reservationTime`, the `int partySize`, the `String customerName`, `String customerEmail`, `String customerPhone`, and the `ReservationStatus status`. The `status` field will default to `PENDING` upon creation.
2.  **ReservationStatus.java**: This enum defines the possible states a reservation can be in: `PENDING`, `CONFIRMED`, `CANCELLED`, `COMPLETED`, `NO_SHOW`.

### Data Transfer Objects (DTOs)

1.  **ReservationDto.java**: Used for returning reservation details in API responses. It mirrors the `Reservation` entity but should only expose necessary fields for the client, including `id`, `reservationTime`, `partySize`, `customerName`, `customerEmail`, `customerPhone`, and `status`.
2.  **CreateReservationRequest.java**: Used for receiving data when a customer creates a new reservation. It includes `LocalDateTime reservationTime`, `int partySize`, `String customerName`, `String customerEmail`, and `String customerPhone`. All fields are mandatory and include appropriate validation annotations (e.g., `@NotNull`, `@Min`, `@Email`, `@Pattern`).

### Repository Layer

1.  **ReservationRepository.java**: Extends `JpaRepository<Reservation, UUID>` to provide standard CRUD operations. It will include custom query methods to find reservations by `reservationTime` (for availability checks) and by `customerEmail` or `customerPhone` (for customer-specific lookups).

### Service Layer

1.  **ReservationService.java**: This service orchestrates the business logic for reservations. It injects `ReservationRepository`.
    *   `createReservation(CreateReservationRequest request)`: 
        1.  Validates the `CreateReservationRequest`. 
        2.  Checks for table availability at the requested `reservationTime` and `partySize`. If no availability, throw `IllegalStateException`.
        3.  Creates a new `Reservation` entity with `PENDING` status.
        4.  Saves the `Reservation` using `reservationRepository.save()`.
        5.  Returns the saved reservation mapped to a `ReservationDto`.
    *   `getReservationById(UUID id)`: 
        1.  Retrieves a `Reservation` by `id` from `reservationRepository.findById()`.
        2.  If not found, throws `ResourceNotFoundException`.
        3.  Returns the `Reservation` mapped to a `ReservationDto`.
    *   `getAllReservations()`: 
        1.  Retrieves all `Reservation` entities from `reservationRepository.findAll()`.
        2.  Maps the list of `Reservation` entities to a list of `ReservationDto`.
    *   `getReservationsByStatus(ReservationStatus status)`: 
        1.  Retrieves `Reservation` entities by `status` from `reservationRepository.findByStatus()`.
        2.  Maps the list of `Reservation` entities to a list of `ReservationDto`.
    *   `updateReservationStatus(UUID id, ReservationStatus newStatus)`: 
        1.  Retrieves the `Reservation` by `id`. If not found, throws `ResourceNotFoundException`.
        2.  Updates the `status` of the reservation to `newStatus`.
        3.  Saves the updated `Reservation` using `reservationRepository.save()`.
        4.  Returns the updated reservation mapped to a `ReservationDto`.
    *   `deleteReservation(UUID id)`: 
        1.  Retrieves the `Reservation` by `id`. If not found, throws `ResourceNotFoundException`.
        2.  Deletes the `Reservation` using `reservationRepository.deleteById()`.

### Controller Layer

1.  **ReservationController.java**: Exposes public API endpoints for customers.
    *   `POST /api/v1/reservations`: Creates a new reservation. Consumes `CreateReservationRequest` and returns `ReservationDto`. Access: `public`.
    *   `GET /api/v1/reservations/{id}`: Retrieves a reservation by ID. Returns `ReservationDto`. Access: `authenticated`.
2.  **AdminReservationController.java**: Exposes admin-only API endpoints for managing reservations. 
    *   `GET /api/v1/admin/reservations`: Retrieves all reservations. Returns `List<ReservationDto>`. Access: `admin`.
    *   `GET /api/v1/admin/reservations/status/{status}`: Retrieves reservations by status. Returns `List<ReservationDto>`. Access: `admin`.
    *   `PUT /api/v1/admin/reservations/{id}/status`: Updates the status of a reservation. Consumes `ReservationStatus` (as a request parameter or body) and returns `ReservationDto`. Access: `admin`.
    *   `DELETE /api/v1/admin/reservations/{id}`: Deletes a reservation. Returns `void`. Access: `admin`.

### Error Handling

*   `ResourceNotFoundException`: Thrown when a requested reservation is not found. Handled by `GlobalExceptionHandler` to return HTTP 404.
*   `IllegalStateException`: Thrown for business rule violations, such as no availability. Handled by `GlobalExceptionHandler` to return HTTP 400.
*   `MethodArgumentNotValidException`: Thrown for DTO validation failures. Handled by `GlobalExceptionHandler` to return HTTP 400.

---

## Order Processing

**Name:** `order-processing`  
**Type:** BACKEND  
**Change required:** true

**Files in this feature:**
- `backend/src/main/java/com/circuithouse/model/Order.java` — MODEL layer — represents a customer's food order, containing order items, total price, and status.
- `backend/src/main/java/com/circuithouse/model/OrderItem.java` — MODEL layer — represents a single line item within an order, linking a menu item with a quantity.
- `backend/src/main/java/com/circuithouse/model/OrderStatus.java` — MODEL layer — enum defining the possible statuses of an order (e.g., PENDING, CONFIRMED, DELIVERED).
- `backend/src/main/java/com/circuithouse/repository/OrderRepository.java` — REPOSITORY layer — Spring Data JPA repository for CRUD operations on the Order entity, and custom queries for customer orders.
- `backend/src/main/java/com/circuithouse/repository/OrderItemRepository.java` — REPOSITORY layer — Spring Data JPA repository for CRUD operations on the OrderItem entity.
- `backend/src/main/java/com/circuithouse/dto/CreateOrderRequest.java` — DTO layer — data transfer object for creating a new online order, containing customer details and items.
- `backend/src/main/java/com/circuithouse/dto/OrderItemRequest.java` — DTO layer — data transfer object representing a single item within a CreateOrderRequest.
- `backend/src/main/java/com/circuithouse/dto/OrderResponse.java` — DTO layer — data transfer object for returning detailed order information in API responses.
- `backend/src/main/java/com/circuithouse/service/OrderService.java` — SERVICE layer — implements createOrder(CreateOrderRequest): OrderResponse, getOrderById(UUID): OrderResponse, getOrdersByCustomerEmail(String): List<OrderResponse>, getAllOrders(): List<OrderResponse>, and updateOrderStatus(UUID, OrderStatus): OrderResponse; delegates menu item lookup to MenuItemRepository and notifications to NotificationService.
- `backend/src/main/java/com/circuithouse/controller/OrderController.java` — CONTROLLER layer — exposes public API endpoints for customers to place and track their orders.
- `backend/src/main/java/com/circuithouse/controller/AdminOrderController.java` — CONTROLLER layer — exposes admin-only API endpoints for viewing and managing all customer orders.

**Feature Instruction:**

The Order Processing feature handles the backend logic for customers to place and manage food orders, and for administrators to view and update these orders. It consists of `Order`, `OrderItem`, and `OrderStatus` models, `OrderRepository` and `OrderItemRepository` for persistence, DTOs for request and response payloads, and `OrderService` and `OrderController`/`AdminOrderController` for business logic and API exposure.

## Models
- `Order.java`: Represents a customer's order. It will have fields for `orderId` (UUID, primary key), `customerName` (String), `customerEmail` (String), `customerPhone` (String), `orderTime` (LocalDateTime), `totalAmount` (BigDecimal), `status` (OrderStatus enum), and a one-to-many relationship with `OrderItem`.
- `OrderItem.java`: Represents a single item within an order. It will have fields for `orderItemId` (UUID, primary key), `menuItem` (ManyToOne relationship with `MenuItem` from `menu-management` feature), `quantity` (int), `priceAtOrder` (BigDecimal), and a ManyToOne relationship with `Order`.
- `OrderStatus.java`: An enum defining the possible states of an order: `PENDING`, `CONFIRMED`, `PREPARING`, `READY_FOR_PICKUP`, `DELIVERED`, `CANCELLED`.

## Repositories
- `OrderRepository.java`: Extends `JpaRepository<Order, UUID>` and provides standard CRUD operations for `Order` entities. It will include a custom method `findByCustomerEmail(String customerEmail): List<Order>` to retrieve orders for a specific customer.
- `OrderItemRepository.java`: Extends `JpaRepository<OrderItem, UUID>` and provides standard CRUD operations for `OrderItem` entities.

## DTOs
- `CreateOrderRequest.java`: Used for creating new orders. It will contain `customerName` (String), `customerEmail` (String), `customerPhone` (String), and a list of `OrderItemRequest`.
- `OrderItemRequest.java`: Represents a single item in `CreateOrderRequest`. It will contain `menuItemId` (UUID) and `quantity` (int).
- `OrderResponse.java`: Used for returning order details. It will contain `orderId` (UUID), `customerName` (String), `customerEmail` (String), `customerPhone` (String), `orderTime` (LocalDateTime), `totalAmount` (BigDecimal), `status` (OrderStatus), and a list of `OrderItemResponse` (a new DTO to be created, similar to `OrderItemRequest` but with `menuItemName` and `priceAtOrder`).

## Services
- `OrderService.java`: This service orchestrates the order creation and management process.
  - `createOrder(CreateOrderRequest request): OrderResponse`: 
    1. Validates the `CreateOrderRequest`. 
    2. Fetches `MenuItem` details for each `OrderItemRequest` using `menu-management`'s `MenuItemRepository.findByIdAndActiveTrue(UUID id)`. If any menu item is not found or inactive, throw `ResourceNotFoundException`.
    3. Calculates `totalAmount` based on `MenuItem` prices and quantities.
    4. Creates an `Order` entity with status `PENDING`.
    5. Creates `OrderItem` entities linked to the `Order`.
    6. Saves the `Order` and `OrderItem`s using `OrderRepository` and `OrderItemRepository`.
    7. Calls `notification-service`'s `NotificationService.sendNotification(String recipient, String message)` to send an order confirmation to the customer's phone number.
    8. Returns an `OrderResponse`.
  - `getOrderById(UUID orderId): OrderResponse`: 
    1. Retrieves an `Order` by `orderId` from `OrderRepository`. Throws `ResourceNotFoundException` if not found.
    2. Maps the `Order` entity to `OrderResponse`.
  - `getOrdersByCustomerEmail(String customerEmail): List<OrderResponse>`:
    1. Retrieves a list of `Order` entities by `customerEmail` from `OrderRepository`.
    2. Maps the list of `Order` entities to `List<OrderResponse>`.
  - `getAllOrders(): List<OrderResponse>`:
    1. Retrieves all `Order` entities from `OrderRepository`.
    2. Maps the list of `Order` entities to `List<OrderResponse>`.
  - `updateOrderStatus(UUID orderId, OrderStatus newStatus): OrderResponse`:
    1. Retrieves an `Order` by `orderId` from `OrderRepository`. Throws `ResourceNotFoundException` if not found.
    2. Updates the `status` of the `Order` to `newStatus`.
    3. Saves the updated `Order` using `OrderRepository`.
    4. Calls `notification-service`'s `NotificationService.sendNotification(String recipient, String message)` to inform the customer about the status update.
    5. Returns an `OrderResponse`.

## Controllers
- `OrderController.java`: Exposes public API endpoints for customers.
  - `createOrder(CreateOrderRequest request)`: Handles POST requests to `/api/v1/orders`.
  - `getOrderById(UUID orderId)`: Handles GET requests to `/api/v1/orders/{orderId}`.
  - `getOrdersByCustomerEmail(String customerEmail)`: Handles GET requests to `/api/v1/orders/customer/{customerEmail}`.
- `AdminOrderController.java`: Exposes admin-only API endpoints.
  - `getAllOrders()`: Handles GET requests to `/api/v1/admin/orders`.
  - `updateOrderStatus(UUID orderId, OrderStatus newStatus)`: Handles PUT requests to `/api/v1/admin/orders/{orderId}/status`.

## Inter-feature Wiring
- `OrderService` injects `OrderRepository`, `OrderItemRepository`, `menu-management`'s `MenuItemRepository`, and `notification-service`'s `NotificationService`.
- `OrderController` and `AdminOrderController` inject `OrderService`.

## Error Handling
- `ResourceNotFoundException` will be thrown by `OrderService` if an order or menu item is not found. Controllers will catch this and return a 404 Not Found response.

---

## Payment Gateway

**Name:** `payment-gateway`  
**Type:** BACKEND  
**Change required:** true

**Files in this feature:**
- `backend/src/main/java/com/circuithouse/dto/PaymentRequest.java` — Data Transfer Object (DTO) — defines the structure for requests to initiate a payment.
- `backend/src/main/java/com/circuithouse/dto/PaymentVerificationRequest.java` — Data Transfer Object (DTO) — defines the structure for requests to verify a payment from the payment gateway webhook.
- `backend/src/main/java/com/circuithouse/service/PaymentService.java` — SERVICE layer — implements initiatePayment(PaymentRequest request): PaymentResponse and verifyPayment(PaymentVerificationRequest request): String; delegates order status updates to OrderService.
- `backend/src/main/java/com/circuithouse/controller/PaymentController.java` — CONTROLLER layer — exposes POST /api/v1/payments/initiate and POST /api/v1/payments/verify endpoints.

**Feature Instruction:**

The Payment Gateway feature handles all interactions with a third-party payment gateway for processing online orders. It consists of two DTOs, a service, and a controller. The `PaymentRequest` DTO is used to initiate a payment, carrying the `orderId` and `amount`. The `PaymentVerificationRequest` DTO is used to receive and verify payment signatures from the gateway's webhooks.

The `PaymentService` is the core business logic component. It exposes `initiatePayment(PaymentRequest request)` to create a payment order with the gateway and `verifyPayment(PaymentVerificationRequest request)` to validate the payment status received from the gateway. When a payment is successfully verified, `PaymentService` calls `order-processing` feature's `OrderService.updateOrderStatus(UUID orderId, OrderStatus newStatus)` to update the corresponding order's status to `PAID`.

The `PaymentController` exposes two API endpoints: `POST /api/v1/payments/initiate` for clients to initiate a payment, and `POST /api/v1/payments/verify` which acts as a webhook endpoint for the payment gateway to send payment verification callbacks. The `initiatePayment` endpoint takes a `PaymentRequest` and returns a `PaymentResponse` (which includes the payment gateway's order ID and signature for the frontend to use). The `verifyPayment` endpoint takes a `PaymentVerificationRequest` and returns a `String` indicating success or failure.

Error Handling:
- `PaymentService.initiatePayment` will throw `PaymentGatewayException` if there's an issue communicating with the payment gateway. The `PaymentController` will catch this and return a `500 Internal Server Error` with a descriptive message.
- `PaymentService.verifyPayment` will throw `IllegalArgumentException` if the signature verification fails. The `PaymentController` will catch this and return a `400 Bad Request`.

---

## Event Management

**Name:** `event-management`  
**Type:** BACKEND  
**Change required:** true

**Files in this feature:**
- `backend/src/main/java/com/circuithouse/model/Event.java` — JPA Entity — defines the data structure for an event in the database.
- `backend/src/main/java/com/circuithouse/repository/EventRepository.java` — REPOSITORY layer — provides standard CRUD operations for the Event entity.
- `backend/src/main/java/com/circuithouse/dto/EventDto.java` — DTO layer — used for transferring event data between service and controller layers.
- `backend/src/main/java/com/circuithouse/service/EventService.java` — SERVICE layer — implements business logic for managing events, including getAllEvents(): List<EventDto>, getUpcomingEvents(): List<EventDto>, getEventById(UUID): EventDto, createEvent(EventDto): EventDto, updateEvent(UUID, EventDto): EventDto, and deleteEvent(UUID): void.
- `backend/src/main/java/com/circuithouse/controller/EventController.java` — CONTROLLER layer — exposes public API endpoints for fetching event information.
- `backend/src/main/java/com/circuithouse/controller/AdminEventController.java` — CONTROLLER layer — exposes admin-only API endpoints for CRUD operations on events.

**Feature Instruction:**

The Event Management feature provides a complete backend solution for managing special events at Circuit House. It includes an `Event` JPA entity for persistence, an `EventRepository` for database interactions, an `EventDto` for data transfer, an `EventService` for business logic, and two controllers: `EventController` for public access to event listings and `AdminEventController` for administrative CRUD operations.

### Event Entity (`Event.java`)
The `Event` entity represents a special event with fields for `id` (UUID), `name` (String), `description` (String), `eventTime` (LocalDateTime), and `imageUrl` (String). It is the core persistence model.

### Event Repository (`EventRepository.java`)
The `EventRepository` extends `JpaRepository` to provide standard CRUD operations for `Event` entities. It does not require custom query methods for this feature.

### Event DTO (`EventDto.java`)
The `EventDto` is used for transferring event data between the service layer and the controllers. It mirrors the `Event` entity's fields: `id` (UUID), `name` (String), `description` (String), `eventTime` (LocalDateTime), and `imageUrl` (String). It includes validation annotations for `name`, `description`, and `eventTime`.

### Event Service (`EventService.java`)
The `EventService` encapsulates the business logic for events. It injects `EventRepository` to interact with the database. All methods handle conversion between `Event` entities and `EventDto` objects.

- `getAllEvents()`: Returns a `List<EventDto>` of all events, ordered by `eventTime` in ascending order. It fetches all `Event` entities from the repository, converts them to `EventDto`, and returns the list.
- `getUpcomingEvents()`: Returns a `List<EventDto>` of events scheduled for the future, ordered by `eventTime` in ascending order. It fetches all `Event` entities, filters for events where `eventTime` is after the current time, converts them to `EventDto`, and returns the list.
- `getEventById(UUID id)`: Retrieves a single event by its `id`. If the event is not found, it throws a `ResourceNotFoundException`. It converts the found `Event` entity to an `EventDto`.
- `createEvent(EventDto eventDto)`: Creates a new event. It takes an `EventDto`, converts it to an `Event` entity, saves it via the repository, and returns the saved entity as an `EventDto`. It validates the input `eventDto`.
- `updateEvent(UUID id, EventDto eventDto)`: Updates an existing event identified by `id`. If the event is not found, it throws a `ResourceNotFoundException`. It updates the fields of the existing `Event` entity with values from the `eventDto`, saves it, and returns the updated entity as an `EventDto`. It validates the input `eventDto`.
- `deleteEvent(UUID id)`: Deletes an event by its `id`. If the event is not found, it throws a `ResourceNotFoundException`.

### Event Controller (`EventController.java`)
The `EventController` exposes public API endpoints for fetching event information. It injects `EventService`.

- `getAllEvents()`: Handles GET requests to `/api/v1/events`. Returns a `ResponseEntity<List<EventDto>>` containing all events. Access is public.
- `getUpcomingEvents()`: Handles GET requests to `/api/v1/events/upcoming`. Returns a `ResponseEntity<List<EventDto>>` containing only upcoming events. Access is public.
- `getEventById(UUID id)`: Handles GET requests to `/api/v1/events/{id}`. Returns a `ResponseEntity<EventDto>` for the specified event. If the event is not found, it returns a 404 NOT FOUND response. Access is public.

### Admin Event Controller (`AdminEventController.java`)
The `AdminEventController` exposes admin-only API endpoints for CRUD operations on events. It injects `EventService`.

- `createEvent(EventDto eventDto)`: Handles POST requests to `/api/v1/admin/events`. Creates a new event. Returns a `ResponseEntity<EventDto>` with the created event and HTTP status 201 CREATED. Access is admin.
- `updateEvent(UUID id, EventDto eventDto)`: Handles PUT requests to `/api/v1/admin/events/{id}`. Updates an existing event. Returns a `ResponseEntity<EventDto>` with the updated event. If the event is not found, it returns a 404 NOT FOUND response. Access is admin.
- `deleteEvent(UUID id)`: Handles DELETE requests to `/api/v1/admin/events/{id}`. Deletes an event. Returns a `ResponseEntity<Void>` with HTTP status 204 NO CONTENT. If the event is not found, it returns a 404 NOT FOUND response. Access is admin.

---

## Notification Service

**Name:** `notification-service`  
**Type:** BACKEND  
**Change required:** true

**Files in this feature:**
- `backend/src/main/java/com/circuithouse/service/NotificationService.java` — SERVICE layer interface — defines the contract for sending notifications, to be implemented by channel-specific services.
- `backend/src/main/java/com/circuithouse/service/WhatsAppNotificationService.java` — SERVICE layer implementation — provides the concrete logic for sending notifications via the WhatsApp Business API.

**Feature Instruction:**

The Notification Service feature provides an abstraction for sending various types of notifications, such as WhatsApp messages or SMS. It defines a `NotificationService` interface that outlines the contract for sending notifications, and concrete implementations like `WhatsAppNotificationService` handle the actual delivery via specific channels. This design allows for easy extension to support new notification channels without modifying the core business logic that triggers notifications.

`NotificationService.java` defines the `sendNotification` method, which takes a recipient, subject, and message. This interface is intended to be injected into other services that need to send notifications (e.g., reservation-system, order-processing) to decouple the notification logic from the business process. The specific implementation (e.g., `WhatsAppNotificationService`) will be chosen at runtime via Spring's dependency injection.

`WhatsAppNotificationService.java` implements the `NotificationService` interface. Its `sendNotification` method will contain the logic to integrate with a WhatsApp Business API provider to send messages. This will involve constructing the appropriate API request with the recipient's phone number and the message content. Error handling within this implementation should log any failures to send notifications but should not prevent the calling business process from completing, as notifications are typically a secondary concern.

**Inter-file Wiring:**
- `WhatsAppNotificationService` implements `NotificationService`.

**Cross-Feature Contracts:**
This feature does not directly call into other features. Other features (like `reservation-system` or `order-processing`) will inject `NotificationService` and call its `sendNotification` method. For example, after a reservation is successfully created, the `ReservationService` might call `notificationService.sendNotification(reservation.getCustomerPhone(), "Reservation Confirmed", "Your reservation at Circuit House is confirmed...")`.

---

## Authentication UI

**Name:** `authentication-ui`  
**Type:** FRONTEND  
**Change required:** true

**Files in this feature:**
- `frontend/src/api/client.ts` — SERVICE layer — configures Axios for API requests, including a request interceptor to attach the JWT token and a response interceptor to handle 401 errors.
- `frontend/src/components/ProtectedRoute.tsx` — COMPONENT layer — provides a higher-order component `ProtectedRoute` that restricts access to its children based on user authentication status.
- `frontend/src/context/AuthContext.tsx` — CONTEXT layer — provides `AuthContext` for managing global authentication state, including `isAuthenticated`, `token`, `login(token: string)`, and `logout()`.
- `frontend/src/hooks/useAuth.ts` — HOOK layer — provides `useAuth()` hook for components to interact with authentication state and actions, exposing `isAuthenticated`, `login(credentials: AuthRequest)`, and `logout()`.
- `frontend/src/services/authService.ts` — SERVICE layer — provides `login(credentials: AuthRequest): Promise<AuthResponse>` for making API calls to the backend authentication endpoint.
- `frontend/src/types/auth.ts` — Generated from the backend API contract — defines TypeScript types for authentication data structures.
- `frontend/src/pages/LoginPage.tsx` — PAGE layer — renders the login form for administrators and handles authentication using the `useAuth` hook.

**Feature Instruction:**

This feature provides the user interface and logic for user authentication, specifically for administrators to log in to the Circuit House management dashboard. It includes an Axios client for API communication, a React Context for global authentication state management, a custom hook for login/logout functionality, a service for interacting with the backend authentication API, TypeScript types for authentication data, a protected route component, and the login page itself.

## Design Tokens
- Navbar: bg-[#1A202C] text-white
- Primary CTA: bg-[#D69E2E] hover:bg-[#B7872A] text-white font-semibold rounded-full px-8 py-3 transition-all duration-200
- Brand text accent: text-[#D69E2E]
- Section bg: bg-[#F7FAFC] (odd sections) / bg-white (even sections)
- Card: bg-white rounded-xl shadow-md border border-gray-100 p-6
- Section container: <section className="py-16 px-4"><div className="max-w-7xl mx-auto">
- Hero h1: text-4xl md:text-6xl font-bold text-white
- Body: text-[#2D3748] leading-relaxed

### Frontend/src/api/client.ts
This file configures the global Axios instance. It sets the base URL for API requests and includes an interceptor to attach the JWT token from `localStorage` to every outgoing request. The token is stored under the key 'token'. If a request receives a 401 (Unauthorized) response, the interceptor will clear the stored token and redirect the user to the login page.

### Frontend/src/types/auth.ts
This file defines the TypeScript interfaces for authentication-related data structures, including `AuthRequest` (for login credentials) and `AuthResponse` (for the JWT token received upon successful login), and `User` for user details.

### Frontend/src/services/authService.ts
This service provides asynchronous functions to interact with the backend authentication API. It exports `login(credentials: AuthRequest): Promise<AuthResponse>` which makes a POST request to `/api/v1/auth/login` and returns the `AuthResponse` containing the JWT token. It uses the configured Axios instance from `client.ts`.

### Frontend/src/context/AuthContext.tsx
This file creates a React Context, `AuthContext`, to manage the global authentication state. It provides `isAuthenticated` (a boolean indicating if a user is logged in), `token` (the JWT string), `login` (a function to set the token and authentication status), and `logout` (a function to clear the token and authentication status). The `token` is persisted in `localStorage` under the key 'token'. The `AuthContextProvider` component wraps the application and makes the authentication state available to all child components.

### Frontend/src/hooks/useAuth.ts
This custom React hook, `useAuth`, simplifies interaction with the `AuthContext`. It provides a convenient way for components to access the `isAuthenticated` status, the `login` function, and the `logout` function. The `login` function calls `authService.login` and, upon success, stores the received `token` in `localStorage` and updates the `AuthContext`.

### Frontend/src/components/ProtectedRoute.tsx
This component is a wrapper that ensures only authenticated users can access its children routes. It consumes the `AuthContext` to check `isAuthenticated`. If the user is not authenticated, it redirects them to the `/login` page. Otherwise, it renders its children.

### Frontend/src/pages/LoginPage.tsx
This page provides the user interface for administrators to log in. It uses the `useAuth` hook to handle the login process. The page displays a form with fields for `username` and `password`. Upon successful login, the user is redirected to the `/admin/dashboard` page. The page layout should be clean and elegant, reflecting the Circuit House brand, with a clear call to action. The form should include input fields for `username` and `password`, a submit button, and display error messages if login fails. The background should be a subtle off-white (`bg-[#F7FAFC]`) with text in dark gray (`text-[#2D3748]`). The login button should use the primary CTA styling (`bg-[#D69E2E]`).

---

## Admin Portal

**Name:** `admin-portal`  
**Type:** FRONTEND  
**Change required:** true

**Files in this feature:**
- `frontend/src/components/AdminLayout.tsx`
- `frontend/src/pages/admin/AdminDashboardPage.tsx`

**Feature Instruction:**

## Design Tokens
- Navbar: bg-[#1A202C] text-white
- Sidebar: bg-[#1A202C] text-white
- Primary CTA: bg-[#D69E2E] hover:bg-[#B7872A] text-white font-semibold rounded-md px-4 py-2 transition-all duration-200
- Brand text accent: text-[#D69E2E]
- Section bg: bg-[#F7FAFC]
- Card: bg-white rounded-lg shadow-sm border border-gray-100 p-4
- Section container: <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
- Hero h1: text-4xl md:text-5xl font-bold text-white
- Body: text-[#2D3748] leading-relaxed

## Admin Portal Feature Instruction

This feature provides the core layout and dashboard for the Circuit House admin panel, enabling restaurant staff to manage various aspects of the business. It consists of two main files: `AdminLayout.tsx` which defines the overall structure with a persistent sidebar navigation, and `AdminDashboardPage.tsx` which serves as the landing page for the admin area, offering a summary overview and quick links to other management sections.

### AdminLayout.tsx

`AdminLayout.tsx` is the top-level component for all authenticated admin pages. It renders a fixed sidebar on the left for navigation and a main content area where specific admin pages will be displayed. The sidebar includes links to different management sections such as 'Dashboard', 'Menu Management', 'Reservations', 'Orders', and 'Events'. These links will navigate to the respective admin pages provided by other features (e.g., `AdminMenuPage`, `AdminReservationsPage`). The layout ensures a consistent user experience across the entire admin portal. It uses `react-router-dom`'s `Outlet` to render child routes within the main content area. The component also includes basic styling using Tailwind CSS, adhering to the defined design tokens.

### AdminDashboardPage.tsx

`AdminDashboardPage.tsx` is the default page displayed when an administrator logs into the portal. It utilizes the `AdminLayout` for its structure. This page will present a high-level overview of key business metrics, such as recent reservations, pending orders, or upcoming events. While the initial implementation will contain placeholder content, it should be structured to easily integrate actual data summaries from backend APIs in future iterations. It will include prominent navigation cards or links to direct administrators to specific management sections, reinforcing the confident and welcoming tone of the portal. The design should be clean and spacious, using the defined design tokens for backgrounds, text, and interactive elements.

### Inter-file Wiring and Cross-Feature Contracts

- `AdminDashboardPage.tsx` will be rendered as a child route within `AdminLayout.tsx`. The `AdminLayout` component uses `react-router-dom`'s `Outlet` to achieve this.
- The navigation links within `AdminLayout.tsx` will point to routes defined by other features (e.g., `/admin/menu`, `/admin/reservations`, `/admin/orders`, `/admin/events`). These routes are handled by `react-router-dom` and will render the respective admin pages from the `menu-display`, `reservation-booking`, `order-flow`, and `event-listing` features.
- This feature does not directly call any backend APIs. It provides the UI shell for other admin features which will consume their respective backend endpoints.
- Authentication is handled by the `authentication-ui` feature. Access to the admin portal (and thus to `AdminLayout` and `AdminDashboardPage`) is protected by the `ProtectedRoute` component from `authentication-ui`, ensuring only authenticated users with appropriate roles can access these pages. The authentication token is expected to be stored in `localStorage` under the key 'token', as established by the `authentication-ui` feature.

---

## Static Pages

**Name:** `static-pages`  
**Type:** FRONTEND  
**Change required:** true

**Files in this feature:**
- `frontend/src/App.tsx` — The root component of the React application, responsible for setting up global routing and context providers.
- `frontend/src/components/Layout.tsx` — Main layout component for public-facing pages, providing a consistent header and footer around page content.
- `frontend/src/components/Header.tsx` — Renders the site-wide header, including the restaurant logo, navigation links, and a 'Book a Table' CTA.
- `frontend/src/components/Footer.tsx` — Renders the site-wide footer, displaying contact information, opening hours, and social media links.
- `frontend/src/pages/HomePage.tsx` — Landing page of the website, composed of a hero section, featured menu items, testimonials, and location information.
- `frontend/src/components/home/HeroSection.tsx` — Displays the main hero section with a background image, a prominent headline, and primary call-to-action buttons.
- `frontend/src/components/home/FeaturedMenuItems.tsx` — Showcases a selection of popular or special menu items fetched from the backend.
- `frontend/src/components/home/TestimonialsSection.tsx` — Displays curated customer reviews and testimonials to build social proof and trust.
- `frontend/src/components/home/LocationMap.tsx` — Shows the restaurant's physical location, opening hours, and an embedded Google Map.
- `frontend/src/pages/AboutPage.tsx` — A static page detailing the restaurant's history, mission, and the philosophy behind its culinary experience.
- `frontend/src/pages/ContactPage.tsx` — Displays comprehensive contact information, including address, phone, and an interactive map.
- `frontend/src/components/contact/ContactInfo.tsx` — Component displaying the restaurant's address, phone number, and WhatsApp contact options.
- `frontend/src/components/contact/GoogleMapsEmbed.tsx` — Embeds an interactive Google Map centered on the restaurant's location.
- `frontend/src/pages/GalleryPage.tsx` — Showcases high-quality photos of the restaurant's food and interior ambiance in a responsive grid.
- `frontend/src/components/gallery/PhotoGrid.tsx` — A responsive grid component for displaying a collection of images.
- `frontend/src/pages/NotFoundPage.tsx` — A 404 page displayed when a user navigates to a non-existent route.
- `frontend/src/utils/schemaMarkup.ts` — Utility functions to generate JSON-LD schema markup for SEO purposes, specifically for the Restaurant entity.

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

This feature provides the core static pages and layout components for the Circuit House restaurant's public-facing frontend. It establishes the overall application structure, routing, and consistent visual design across the website. The `App.tsx` file sets up the main routing using `react-router-dom` and wraps the application with necessary providers. The `Layout.tsx` component defines the common header and footer for all public pages, ensuring a consistent brand experience.

The `Header.tsx` component includes the restaurant's logo, navigation links to `Home`, `Menu`, `Reservations`, `Events`, `About`, `Gallery`, and `Contact` pages, and a prominent 'Book a Table' call-to-action. The `Footer.tsx` displays essential business information such as address, phone number, opening hours, and social media links.

The `HomePage.tsx` is the landing page, composed of several sub-components:
- `HeroSection.tsx`: Features a full-bleed hero image of the restaurant's interior with a compelling headline "Experience Culinary Excellence at Circuit House" and a "Book a Table" CTA. The image used is `https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=1920&q=80` with a `bg-black bg-opacity-50` overlay.
- `FeaturedMenuItems.tsx`: Showcases a selection of popular menu items, fetching data using the `useMenu` hook from the `menu-display` feature. It displays `MenuItemDto` objects, specifically their `name`, `description`, `price`, and `imageUrl` fields.
- `TestimonialsSection.tsx`: Presents customer testimonials, reinforcing the restaurant's reputation for quality.
- `LocationMap.tsx`: Displays the restaurant's address, opening hours, and an embedded Google Map.

The `AboutPage.tsx` provides information about the restaurant's story and mission, while the `ContactPage.tsx` offers contact details, a contact form (not implemented in this feature, but space is reserved), and an interactive Google Map via `GoogleMapsEmbed.tsx`. The `ContactInfo.tsx` component within the `ContactPage` displays the restaurant's address, phone number, and WhatsApp contact.

The `GalleryPage.tsx` showcases high-quality photos of the restaurant's food and interior using the `PhotoGrid.tsx` component. The `NotFoundPage.tsx` handles invalid routes, providing a user-friendly 404 message.

Finally, `schemaMarkup.ts` provides utility functions to generate JSON-LD schema markup for SEO, specifically for the `Restaurant` entity, using the business context details provided.

All components adhere to the defined design tokens for colors, typography, and spacing to maintain a cohesive visual identity. Navigation between pages is handled by `react-router-dom`'s `Link` component, ensuring client-side routing.

---

## Menu Display

**Name:** `menu-display`  
**Type:** FRONTEND  
**Change required:** true

**Files in this feature:**
- `frontend/src/hooks/useMenu.ts` — Custom hook for managing menu data using TanStack Query, providing `useMenuItems`, `useMenuItem`, `useMenuItemCategories`, `useCreateMenuItem`, `useUpdateMenuItem`, `useDeleteMenuItem`, `useCreateMenuItemCategory`, `useUpdateMenuItemCategory`, and `useDeleteMenuItemCategory`.
- `frontend/src/services/menuService.ts` — SERVICE layer — provides functions for making API calls to the menu and admin menu endpoints, including `getAllMenuItems`, `getMenuItemById`, `getMenuItemsByCategory`, `getAllMenuItemCategories`, `createMenuItem`, `updateMenuItem`, `deleteMenuItem`, `createMenuItemCategory`, `updateMenuItemCategory`, and `deleteMenuItemCategory`.
- `frontend/src/types/menu.ts` — Generated from the backend API contract — defines TypeScript types and interfaces for menu items and categories.
- `frontend/src/pages/MenuPage.tsx` — PAGE layer — displays the full digital menu with category tabs and a grid of menu items.
- `frontend/src/components/menu/MenuCategoryTabs.tsx` — COMPONENT layer — renders interactive tabs for filtering the menu by category, accepting `categories`, `selectedCategory`, and `onSelectCategory` props.
- `frontend/src/components/menu/MenuItemsGrid.tsx` — COMPONENT layer — displays menu items in a responsive grid of cards with photos, descriptions, and prices, accepting `menuItems` as props.
- `frontend/src/pages/admin/AdminMenuPage.tsx` — PAGE layer — admin interface for managing the menu, composing a data table and creation/edit forms.
- `frontend/src/components/menu/MenuTable.tsx` — COMPONENT layer — displays all menu items in a table with actions for editing and deleting, accepting `menuItems`, `onEdit`, and `onDelete` props.
- `frontend/src/components/menu/MenuItemForm.tsx` — COMPONENT layer — a form for creating or editing a menu item, accepting `initialData`, `categories`, `onSubmit`, and `onCancel` props.
- `frontend/src/components/menu/DeleteMenuItemDialog.tsx` — COMPONENT layer — a confirmation dialog for deleting a menu item, accepting `isOpen`, `onConfirm`, and `onCancel` props.

**Feature Instruction:**

## Design Tokens
- Navbar: bg-[#1A202C] text-white
- Primary CTA: bg-[#D69E2E] hover:bg-[#B78727] text-white font-semibold rounded-full px-8 py-3 transition-all duration-200
- Brand text accent: text-[#D69E2E]
- Section bg: bg-[#F7FAFC] (odd sections) / bg-white (even sections)
- Card: bg-white rounded-xl shadow-md border border-gray-100 p-6
- Section container: <section className="py-16 px-4"><div className="max-w-7xl mx-auto">
- Hero h1: text-4xl md:text-6xl font-bold text-white
- Body: text-[#2D3748] leading-relaxed

## Feature Instruction: Menu Display

This feature provides the frontend components and logic for displaying Circuit House's menu to customers and managing it in the admin portal. It consists of a public-facing menu page (`MenuPage.tsx`) and an admin menu management page (`AdminMenuPage.tsx`), along with shared components, hooks, services, and types.

### Data Structures (`frontend/src/types/menu.ts`)

The `menu.ts` file defines the TypeScript interfaces for `MenuItemDto` and `MenuItemCategoryDto`, mirroring the backend `menu-management` feature's DTOs. These types ensure consistency across the frontend application when handling menu-related data.

- `MenuItemDto`: Represents a single menu item with fields like `id`, `name`, `description`, `price`, `imageUrl`, `categoryName`, and `active`.
- `MenuItemCategoryDto`: Represents a menu category with fields like `id`, `name`, and `description`.

### API Service (`frontend/src/services/menuService.ts`)

The `menuService.ts` file encapsulates all API calls related to menu items and categories. It uses the `apiClient` from `frontend/src/api/client.ts` to make HTTP requests to the `menu-management` backend feature. This service provides functions for fetching all menu items, menu items by category, a single menu item by ID, and all menu categories. For admin operations, it includes functions for creating, updating, and deleting menu items and categories.

- `getAllMenuItems()`: Fetches all active menu items. Calls `GET /api/v1/menu/items`.
- `getMenuItemById(id: string)`: Fetches a single menu item by its ID. Calls `GET /api/v1/menu/items/{id}`.
- `getMenuItemsByCategory(categoryName: string)`: Fetches menu items belonging to a specific category. Calls `GET /api/v1/menu/items/category/{categoryName}`.
- `getAllMenuItemCategories()`: Fetches all menu categories. Calls `GET /api/v1/menu/categories`.
- `createMenuItem(item: Omit<MenuItemDto, 'id'>)`: Creates a new menu item. Calls `POST /api/v1/admin/menu/items`.
- `updateMenuItem(id: string, item: MenuItemDto)`: Updates an existing menu item. Calls `PUT /api/v1/admin/menu/items/{id}`.
- `deleteMenuItem(id: string)`: Deletes a menu item. Calls `DELETE /api/v1/admin/menu/items/{id}`.
- `createMenuItemCategory(category: Omit<MenuItemCategoryDto, 'id'>)`: Creates a new menu category. Calls `POST /api/v1/admin/menu/categories`.
- `updateMenuItemCategory(id: string, category: MenuItemCategoryDto)`: Updates an existing menu category. Calls `PUT /api/v1/admin/menu/categories/{id}`.
- `deleteMenuItemCategory(id: string)`: Deletes a menu category. Calls `DELETE /api/v1/admin/menu/categories/{id}`.

### Custom Hook (`frontend/src/hooks/useMenu.ts`)

The `useMenu.ts` hook leverages TanStack Query to manage the state and caching of menu data. It provides functions to fetch menu items and categories, and mutations for admin operations. This hook abstracts the data fetching logic, making it reusable across different components and pages.

- `useMenuItems(categoryName?: string)`: Fetches menu items. If `categoryName` is provided, it fetches items for that category; otherwise, it fetches all items. Returns `QueryObserverResult<MenuItemDto[], Error>`.
- `useMenuItem(id: string)`: Fetches a single menu item by ID. Returns `QueryObserverResult<MenuItemDto, Error>`.
- `useMenuItemCategories()`: Fetches all menu categories. Returns `QueryObserverResult<MenuItemCategoryDto[], Error>`.
- `useCreateMenuItem()`: Returns a mutation function to create a menu item. On success, it invalidates the 'menuItems' query to refetch data. Calls `menuService.createMenuItem`.
- `useUpdateMenuItem()`: Returns a mutation function to update a menu item. On success, it invalidates the 'menuItems' query. Calls `menuService.updateMenuItem`.
- `useDeleteMenuItem()`: Returns a mutation function to delete a menu item. On success, it invalidates the 'menuItems' query. Calls `menuService.deleteMenuItem`.
- `useCreateMenuItemCategory()`: Returns a mutation function to create a menu category. On success, it invalidates the 'menuCategories' query. Calls `menuService.createMenuItemCategory`.
- `useUpdateMenuItemCategory()`: Returns a mutation function to update a menu category. On success, it invalidates the 'menuCategories' query. Calls `menuService.updateMenuItemCategory`.
- `useDeleteMenuItemCategory()`: Returns a mutation function to delete a menu category. On success, it invalidates the 'menuCategories' query. Calls `menuService.deleteMenuItemCategory`.

### Public Menu Page (`frontend/src/pages/MenuPage.tsx`)

The `MenuPage.tsx` component displays the public-facing menu of Circuit House. It uses the `Layout` component from `static-pages` for consistent navigation and footer. The page fetches all menu items and categories using `useMenu` hooks. It renders `MenuCategoryTabs` to allow users to filter menu items by category and `MenuItemsGrid` to display the filtered items.

**Structure:**
1.  Wraps content in `<Layout>`.
2.  Fetches `menuItems` and `categories` using `useMenuItems()` and `useMenuItemCategories()`.
3.  Manages `selectedCategory` state.
4.  Renders a prominent heading: "Our Exquisite Menu" with a sub-heading: "Discover a culinary journey crafted with passion and the finest ingredients."
5.  Displays `MenuCategoryTabs` component, passing `categories` and `selectedCategory` as props, and an `onSelectCategory` handler.
6.  Displays `MenuItemsGrid` component, passing `filteredMenuItems` as props.

### Menu Category Tabs Component (`frontend/src/components/menu/MenuCategoryTabs.tsx`)

The `MenuCategoryTabs.tsx` component renders a set of interactive tabs for filtering menu items by category. It receives a list of `MenuItemCategoryDto` and the currently `selectedCategory` as props, along with an `onSelectCategory` callback.

**Props:**
- `categories: MenuItemCategoryDto[]`
- `selectedCategory: string | null`
- `onSelectCategory: (categoryName: string | null) => void`

**Logic:**
1.  Renders a list of clickable tabs, including an "All" tab.
2.  Each tab displays the `name` of a `MenuItemCategoryDto`.
3.  When a tab is clicked, it calls `onSelectCategory` with the corresponding category name (or `null` for "All").
4.  The active tab is styled using `bg-[#D69E2E] text-white` and inactive tabs use `bg-gray-200 text-[#2D3748]`.

### Menu Items Grid Component (`frontend/src/components/menu/MenuItemsGrid.tsx`)

The `MenuItemsGrid.tsx` component displays a responsive grid of `MenuItemDto` cards. Each card shows the item's `imageUrl`, `name`, `description`, and `price`.

**Props:**
- `menuItems: MenuItemDto[]`

**Logic:**
1.  Renders a responsive grid (e.g., `grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8`).
2.  Each `MenuItemDto` is rendered as a card with an image, name, description, and price.
3.  Image uses `object-cover` and `rounded-t-lg`.
4.  Item name uses `text-xl font-semibold text-[#1A202C]`.
5.  Description uses `text-[#2D3748]`.
6.  Price uses `text-[#D69E2E] font-bold text-lg`.

### Admin Menu Page (`frontend/src/pages/admin/AdminMenuPage.tsx`)

The `AdminMenuPage.tsx` component provides an interface for administrators to manage menu items and categories. It uses the `AdminLayout` component from `admin-portal` for consistent admin navigation. It fetches all menu items and categories using `useMenu` hooks and provides functionality to create, edit, and delete menu items.

**Structure:**
1.  Wraps content in `<AdminLayout>`.
2.  Fetches `menuItems` and `categories` using `useMenuItems()` and `useMenuItemCategories()`.
3.  Provides buttons for "Add New Menu Item" and "Manage Categories".
4.  Renders `MenuTable` to display existing menu items.
5.  Manages state for `isFormOpen`, `editingMenuItem`, `isDeleteDialogOpen`, `deletingMenuItemId`.
6.  Displays `MenuItemForm` in a modal for creating/editing menu items.
7.  Displays `DeleteMenuItemDialog` in a modal for confirming item deletion.

### Menu Table Component (`frontend/src/components/menu/MenuTable.tsx`)

The `MenuTable.tsx` component displays a sortable and filterable table of `MenuItemDto` objects. It includes actions for editing and deleting menu items.

**Props:**
- `menuItems: MenuItemDto[]`
- `onEdit: (item: MenuItemDto) => void`
- `onDelete: (id: string) => void`

**Logic:**
1.  Renders a table with columns for `Image`, `Name`, `Category`, `Price`, `Active`, and `Actions`.
2.  Each row represents a `MenuItemDto`.
3.  "Edit" button triggers `onEdit` with the `MenuItemDto`.
4.  "Delete" button triggers `onDelete` with the `MenuItemDto.id`.

### Menu Item Form Component (`frontend/src/components/menu/MenuItemForm.tsx`)

The `MenuItemForm.tsx` component is a reusable form for creating or editing a `MenuItemDto`. It typically appears within a modal or dialog.

**Props:**
- `initialData?: MenuItemDto` (for editing)
- `categories: MenuItemCategoryDto[]`
- `onSubmit: (item: MenuItemDto) => void`
- `onCancel: () => void`

**Logic:**
1.  Uses a form library (e.g., React Hook Form) for validation and state management.
2.  Fields include `name`, `description`, `price`, `imageUrl`, `categoryName`, and `active`.
3.  `categoryName` is a dropdown populated from `categories` prop.
4.  "Save" button triggers `onSubmit` with the form data.
5.  "Cancel" button triggers `onCancel`.

### Delete Menu Item Dialog Component (`frontend/src/components/menu/DeleteMenuItemDialog.tsx`)

The `DeleteMenuItemDialog.tsx` component is a confirmation dialog for deleting a menu item.

**Props:**
- `isOpen: boolean`
- `onConfirm: () => void`
- `onCancel: () => void`

**Logic:**
1.  Displays a confirmation message.
2.  "Confirm" button triggers `onConfirm`.
3.  "Cancel" button triggers `onCancel`.

### Inter-file Wiring

- `MenuPage.tsx` and `AdminMenuPage.tsx` both import and use the `useMenu` hook to fetch and manage menu data.
- `useMenu.ts` imports and calls functions from `menuService.ts` to interact with the backend API.
- `menuService.ts` imports `apiClient` for making HTTP requests and `MenuItemDto`, `MenuItemCategoryDto` from `menu.ts` for type definitions.
- `MenuPage.tsx` renders `MenuCategoryTabs.tsx` and `MenuItemsGrid.tsx`.
- `AdminMenuPage.tsx` renders `MenuTable.tsx`, `MenuItemForm.tsx`, and `DeleteMenuItemDialog.tsx`.
- `MenuCategoryTabs.tsx` and `MenuItemsGrid.tsx` receive `MenuItemDto` and `MenuItemCategoryDto` data as props.
- `MenuTable.tsx`, `MenuItemForm.tsx`, and `DeleteMenuItemDialog.tsx` also work with `MenuItemDto` and `MenuItemCategoryDto` types.

### Cross-Feature Contracts

This feature depends on the `menu-management` backend feature for all menu-related API operations. It consumes the following endpoints:

- `GET /api/v1/menu/items` (public)
- `GET /api/v1/menu/items/{id}` (public)
- `GET /api/v1/menu/items/category/{categoryName}` (public)
- `GET /api/v1/menu/categories` (public)
- `POST /api/v1/admin/menu/items` (admin)
- `PUT /api/v1/admin/menu/items/{id}` (admin)
- `DELETE /api/v1/admin/menu/items/{id}` (admin)
- `POST /api/v1/admin/menu/categories` (admin)
- `PUT /api/v1/admin/menu/categories/{id}` (admin)
- `DELETE /api/v1/admin/menu/categories/{id}` (admin)

This feature also uses the `Layout` component from `static-pages` and `AdminLayout` from `admin-portal`.


---

## Reservation Booking

**Name:** `reservation-booking`  
**Type:** FRONTEND  
**Change required:** true

**Files in this feature:**
- `frontend/src/hooks/useReservations.ts` — Custom React hook for managing reservation data using TanStack Query, providing data fetching and mutation capabilities to components.
- `frontend/src/services/reservationService.ts` — Frontend service layer for interacting with the backend reservation API, exposing functions for CRUD operations on reservations.
- `frontend/src/types/reservation.ts` — TypeScript types and interfaces for reservation data, generated from the backend API contract.
- `frontend/src/pages/ReservationPage.tsx` — Public-facing page for customers to book a table at Circuit House, integrating the reservation form.
- `frontend/src/components/reservation/ReservationForm.tsx` — React component rendering an interactive form for customers to submit new table reservations.
- `frontend/src/pages/admin/AdminReservationsPage.tsx` — Admin page for viewing, filtering, and managing all customer reservations, including status updates and deletion.
- `frontend/src/components/reservation/ReservationsTable.tsx` — React component displaying a sortable and filterable table of reservations, typically for admin use.
- `frontend/src/components/reservation/ReservationDetailModal.tsx` — React component for a modal dialog to view detailed reservation information and update its status.

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

This feature provides the frontend functionality for customers to book reservations at Circuit House and for administrators to manage these reservations. It consists of several files working together:

1.  **`reservation.ts`**: Defines the TypeScript types and interfaces for reservation-related data, ensuring type safety across the feature.

2.  **`reservationService.ts`**: Handles all API interactions with the backend `reservation-system` feature. It exports asynchronous functions for creating, fetching, updating, and deleting reservations. This service uses the `api/client.ts` for making HTTP requests.

    -   `createReservation(reservation: CreateReservationRequest): Promise<ReservationDto>`: Sends a POST request to `/api/v1/reservations` to create a new reservation.
    -   `getReservationById(id: string): Promise<ReservationDto>`: Sends a GET request to `/api/v1/reservations/{id}` to fetch a single reservation.
    -   `getAllReservations(): Promise<ReservationDto[]>`: Sends a GET request to `/api/v1/admin/reservations` to fetch all reservations (admin access).
    -   `getReservationsByStatus(status: ReservationStatus): Promise<ReservationDto[]>`: Sends a GET request to `/api/v1/admin/reservations/status/{status}` to fetch reservations filtered by status (admin access).
    -   `updateReservationStatus(id: string, newStatus: ReservationStatus): Promise<ReservationDto>`: Sends a PUT request to `/api/v1/admin/reservations/{id}/status` to update a reservation's status (admin access).
    -   `deleteReservation(id: string): Promise<void>`: Sends a DELETE request to `/api/v1/admin/reservations/{id}` to delete a reservation (admin access).

3.  **`useReservations.ts`**: A custom React hook built with TanStack Query. It consumes the `reservationService.ts` to provide data fetching and mutation capabilities to React components. It exports:

    -   `useCreateReservation()`: A mutation hook for creating new reservations. On success, it invalidates the `['reservations']` query to refetch the list of reservations.
    -   `useReservation(id: string)`: A query hook for fetching a single reservation by its ID.
    -   `useAllReservations()`: A query hook for fetching all reservations (for admin use).
    -   `useReservationsByStatus(status: ReservationStatus)`: A query hook for fetching reservations filtered by status (for admin use).
    -   `useUpdateReservationStatus()`: A mutation hook for updating a reservation's status. On success, it invalidates the `['reservations']` query.
    -   `useDeleteReservation()`: A mutation hook for deleting a reservation. On success, it invalidates the `['reservations']` query.

4.  **`ReservationForm.tsx`**: A React component that renders the form for customers to submit a new reservation. It uses `useCreateReservation` from `useReservations.ts` to handle form submission. The form collects `reservationTime`, `partySize`, `customerName`, `customerEmail`, and `customerPhone`. It includes input validation and displays success/error messages.

5.  **`ReservationPage.tsx`**: The public-facing page where customers can book a table. It wraps the `ReservationForm` component and uses the `Layout` component from the `static-pages` feature for consistent navigation and footer. The page features a prominent heading "Book Your Table at Circuit House" and a sub-heading "Experience our graceful ambiance and exquisite dining. Reserve your spot now!" with a background image of the restaurant interior.

6.  **`ReservationsTable.tsx`**: A React component for displaying a list of reservations in a tabular format, typically used in the admin interface. It receives a list of `ReservationDto` objects as props and allows for sorting and filtering. Each row includes reservation details and actions (e.g., view details, update status, delete).

7.  **`ReservationDetailModal.tsx`**: A modal component to display the full details of a selected reservation and allow administrators to update its status. It receives a `ReservationDto` and functions for updating/closing the modal as props. It uses `useUpdateReservationStatus` from `useReservations.ts`.

8.  **`AdminReservationsPage.tsx`**: The admin page for managing all reservations. It uses `useAllReservations` and `useReservationsByStatus` from `useReservations.ts` to fetch reservation data. It renders the `ReservationsTable` to display the list of reservations and integrates `ReservationDetailModal` for viewing and updating individual reservation details. This page is wrapped in `AdminLayout` from the `admin-portal` feature.

**Inter-file Wiring:**
- `ReservationPage.tsx` renders `ReservationForm.tsx`.
- `ReservationForm.tsx` uses the `useCreateReservation` hook from `useReservations.ts`.
- `AdminReservationsPage.tsx` uses `useAllReservations`, `useReservationsByStatus`, `useUpdateReservationStatus`, and `useDeleteReservation` hooks from `useReservations.ts`. It renders `ReservationsTable.tsx` and `ReservationDetailModal.tsx`.
- `ReservationsTable.tsx` and `ReservationDetailModal.tsx` consume `ReservationDto` types from `reservation.ts`.
- `useReservations.ts` calls functions from `reservationService.ts`.
- `reservationService.ts` uses `frontend/src/api/client.ts` for HTTP requests and types from `reservation.ts`.

**Cross-Feature Contracts:**
- `ReservationPage.tsx` uses the `Layout` component from the `static-pages` feature.
- `AdminReservationsPage.tsx` uses the `AdminLayout` component from the `admin-portal` feature.
- `reservationService.ts` calls the `reservation-system` backend feature's API endpoints:
    - `POST /api/v1/reservations` for `createReservation`.
    - `GET /api/v1/reservations/{id}` for `getReservationById`.
    - `GET /api/v1/admin/reservations` for `getAllReservations`.
    - `GET /api/v1/admin/reservations/status/{status}` for `getReservationsByStatus`.
    - `PUT /api/v1/admin/reservations/{id}/status` for `updateReservationStatus`.
    - `DELETE /api/v1/admin/reservations/{id}` for `deleteReservation`.

---

## Online Ordering Flow

**Name:** `order-flow`  
**Type:** FRONTEND  
**Change required:** true

**Files in this feature:**
- `frontend/src/hooks/useOrders.ts` — Custom hook layer – provides TanStack Query hooks for interacting with the order-processing backend API, including `useCreateOrder()`, `useOrder(orderId: string)`, `useAllOrders()`, and `useUpdateOrderStatus()`.
- `frontend/src/services/orderService.ts` — API service layer – provides asynchronous functions for making direct API calls to the order-processing backend endpoints.
- `frontend/src/types/order.ts` — TypeScript type definitions – defines the data structures for order-related entities, DTOs, and requests.
- `frontend/src/context/CartContext.tsx` — React Context layer – provides global state management for the shopping cart, exposing cart items and functions to modify the cart.
- `frontend/src/services/local/cartService.ts` — Local storage service layer – handles persistence of cart data in the browser's localStorage.
- `frontend/src/pages/OrderPage.tsx` — Page component – orchestrates the menu selection, cart display, and checkout form for customer online ordering.
- `frontend/src/components/order/OrderMenuSelection.tsx` — Component – displays available menu items and allows customers to add them to the shopping cart.
- `frontend/src/components/order/OrderCartView.tsx` — Component – presents the current contents of the customer's shopping cart, including item quantities and total.
- `frontend/src/components/order/OrderCheckoutForm.tsx` — Component – handles customer information input and initiates the order placement and payment process.
- `frontend/src/pages/OrderConfirmationPage.tsx` — Page component – displays a summary and confirmation of a successfully placed order.
- `frontend/src/pages/admin/AdminOrdersPage.tsx` — Admin page component – provides a comprehensive interface for administrators to view and manage all customer orders.
- `frontend/src/components/order/OrdersTable.tsx` — Component – displays a tabular view of multiple orders with options for interaction.
- `frontend/src/components/order/OrderDetailModal.tsx` — Component – presents a modal dialog showing the full details of a single order.

**Feature Instruction:**

## Design Tokens
- Navbar: bg-[#1A202C] text-white
- Primary CTA: bg-[#D69E2E] hover:bg-[#B7872A] text-white font-semibold rounded-full px-8 py-3 transition-all duration-200
- Brand text accent: text-[#D69E2E]
- Section bg: bg-[#F7FAFC] (odd sections) / bg-white (even sections)
- Card: bg-white rounded-xl shadow-md border border-gray-100 p-6
- Section container: <section className="py-16 px-4"><div className="max-w-7xl mx-auto">
- Hero h1: text-4xl md:text-6xl font-bold text-white
- Body: text-[#2D3748] leading-relaxed

## Online Ordering Flow Feature Instruction

This feature provides the complete frontend implementation for Circuit House's online ordering system, encompassing menu browsing, cart management, order placement, and order administration. It integrates with the `menu-management`, `order-processing`, and `payment-gateway` backend features, as well as the `menu-display` and `payment-ui` frontend features.

### Core Components and Flow:

1.  **`order.ts`**: Defines the TypeScript interfaces for `Order`, `OrderItem`, `CreateOrderRequest`, `OrderItemRequest`, and `OrderResponse`, mirroring the backend `order-processing` feature's DTOs. These types are crucial for ensuring type safety across the frontend application when handling order-related data.

2.  **`cartService.ts`**: Manages the client-side shopping cart state. It provides functions to `getCartItems()`, `addItem(item: MenuItemDto, quantity: number)`, `updateItemQuantity(menuItemId: string, quantity: number)`, `removeItem(menuItemId: string)`, `clearCart()`, and `getCartTotal()`. The cart data is persisted in `localStorage` to maintain state across sessions.

3.  **`CartContext.tsx`**: Provides a React Context (`CartContext`) to make the cart state and its management functions (`addItem`, `updateItemQuantity`, `removeItem`, `clearCart`, `getCartTotal`, `cartItems`) globally accessible to components within the online ordering flow. It uses `cartService.ts` for actual cart operations and `useState` to manage the in-memory cart state, synchronizing with `localStorage` on updates.

4.  **`orderService.ts`**: Acts as the API client for the `order-processing` backend feature. It exports asynchronous functions `createOrder(request: CreateOrderRequest): Promise<OrderResponse>`, `getOrderById(orderId: string): Promise<OrderResponse>`, `getAllOrders(): Promise<OrderResponse[]>`, and `updateOrderStatus(orderId: string, status: OrderStatus): Promise<OrderResponse>`. These functions use the shared `api/client.ts` for making HTTP requests.

5.  **`useOrders.ts`**: A custom TanStack Query hook that wraps `orderService.ts`. It provides `useCreateOrder()` for placing new orders, `useOrder(orderId: string)` for fetching a single order, `useAllOrders()` for fetching all orders (for admin), and `useUpdateOrderStatus()` for updating an order's status (for admin). These hooks manage loading, error, and caching states, simplifying data fetching and mutation in React components.

6.  **`OrderPage.tsx`**: This is the main customer-facing page for online ordering. It integrates `OrderMenuSelection.tsx`, `OrderCartView.tsx`, and `OrderCheckoutForm.tsx`. The layout should be clean and spacious, allowing customers to easily browse the menu, manage their cart, and complete the checkout process. It uses the `Layout` component from `static-pages`.
    -   **Menu Section**: Displays menu items fetched via `OrderMenuSelection`.
    -   **Cart Section**: A sidebar or floating element showing items in the cart, managed by `OrderCartView`.
    -   **Checkout Section**: A form for customer details and payment initiation, handled by `OrderCheckoutForm`.

7.  **`OrderMenuSelection.tsx`**: Displays the menu items available for order. It consumes the `useMenuItems()` hook from the `menu-display` feature to fetch menu items. Each menu item will have an "Add to Cart" button that calls `CartContext.addItem()`.

8.  **`OrderCartView.tsx`**: Renders the current contents of the shopping cart. It consumes `CartContext` to display `cartItems`, `getCartTotal()`, and provides controls to `updateItemQuantity()` and `removeItem()` for each item. It also includes a "Clear Cart" button and a "Proceed to Checkout" button that navigates to the checkout form.

9.  **`OrderCheckoutForm.tsx`**: Collects customer details (name, email, phone) and initiates the order and payment process. It uses the `useCreateOrder()` hook from `useOrders.ts` to submit the order to the backend. Upon successful order creation, it will then call `useInitiatePayment()` from the `payment-ui` feature, passing the `orderId` and `totalAmount` from the `OrderResponse`. After payment initiation, it should navigate to `OrderConfirmationPage.tsx`.

10. **`OrderConfirmationPage.tsx`**: Displays a confirmation message to the customer after a successful order and payment. It should show the `orderId` and a summary of the order. This page will be accessible via a route like `/order-confirmation/:orderId` and should fetch the order details using `useOrder(orderId)` from `useOrders.ts`.

11. **`AdminOrdersPage.tsx`**: This page provides an administrative interface for viewing and managing all customer orders. It uses the `AdminLayout` component from `admin-portal`. It fetches all orders using `useAllOrders()` from `useOrders.ts`. It integrates `OrdersTable.tsx` to display a list of orders and `OrderDetailModal.tsx` to show detailed information for a selected order. It also provides functionality to update order statuses using `useUpdateOrderStatus()`.

12. **`OrdersTable.tsx`**: A presentational component that renders a table of `OrderResponse` objects. It displays key order details (ID, customer name, total, status, time) and provides actions like "View Details" and "Update Status". It emits events for these actions to its parent (`AdminOrdersPage.tsx`).

13. **`OrderDetailModal.tsx`**: A modal component to display comprehensive details of a single `OrderResponse`. It receives an `OrderResponse` object as a prop and shows all fields, including individual `OrderItemResponse` details. It also includes an option to update the order status, calling the `useUpdateOrderStatus()` hook via a prop from `AdminOrdersPage.tsx`.

### Inter-feature Wiring:

-   `OrderMenuSelection.tsx` calls `menu-display`'s `useMenuItems()` hook.
-   `OrderCheckoutForm.tsx` calls `order-processing`'s `/api/v1/orders` endpoint via `orderService.createOrder` (wrapped by `useCreateOrder`) and `payment-gateway`'s `/api/v1/payments/initiate` endpoint via `payment-ui`'s `useInitiatePayment()` hook.
-   `OrderConfirmationPage.tsx` and `AdminOrdersPage.tsx` call `order-processing`'s `/api/v1/orders/{orderId}` and `/api/v1/admin/orders` endpoints respectively, via `orderService` (wrapped by `useOrders` hooks).
-   `AdminOrdersPage.tsx` and `OrderDetailModal.tsx` call `order-processing`'s `/api/v1/admin/orders/{orderId}/status` endpoint via `orderService.updateOrderStatus` (wrapped by `useUpdateOrderStatus`).

All API calls from `orderService.ts` will use the `api/client.ts` for authenticated requests, ensuring the JWT token is included if available in `localStorage` under the key 'token'.

---

## Payment UI

**Name:** `payment-ui`  
**Type:** FRONTEND  
**Change required:** true

**Files in this feature:**
- `frontend/src/hooks/usePayment.ts` — Custom React hook that orchestrates the payment flow by interacting with the `paymentService` and handling redirects to and from the payment gateway. It exposes `initiatePayment` and `verifyPayment` functions.
- `frontend/src/services/paymentService.ts` — Frontend service layer for making API calls to the backend payment-gateway feature. It exposes `initiatePayment` and `verifyPayment` functions.
- `frontend/src/types/payment.ts` — Generated from the backend API contract — TypeScript types and interfaces for payment data structures.

**Feature Instruction:**

The payment-ui feature provides the frontend logic for integrating with a payment gateway to process orders. It consists of a custom React hook (`usePayment.ts`), a service layer for API calls (`paymentService.ts`), and TypeScript type definitions (`payment.ts`).

`payment.ts` defines the data structures for payment requests, responses, and verification, ensuring type safety across the payment flow.

`paymentService.ts` acts as the intermediary between the frontend and the backend payment-gateway feature. It exports two asynchronous functions: `initiatePayment` and `verifyPayment`. `initiatePayment` sends a `PaymentRequest` (containing `orderId` and `amount`) to the `/api/v1/payments/initiate` endpoint and expects a `PaymentResponse` in return, which includes a `paymentId` and `redirectUrl` for the payment gateway. `verifyPayment` sends a `PaymentVerificationRequest` (containing `paymentId`, `orderId`, `signature`, and `status`) to the `/api/v1/payments/verify` endpoint to confirm the payment status.

`usePayment.ts` is a custom React hook that encapsulates the payment processing logic. It provides functions to initiate a payment and handle the redirection to and from the payment gateway. The `initiatePayment` function in this hook will call `paymentService.initiatePayment` with the `orderId` and `amount`. Upon receiving a `PaymentResponse`, it will redirect the user to the `redirectUrl` provided by the payment gateway. After the user completes the payment on the gateway, they will be redirected back to the application, where `usePayment` will handle the verification process by calling `paymentService.verifyPayment` with the necessary details from the URL parameters or callback. This hook will also manage loading states and error handling during the payment process.

**Inter-file Wiring:**
- `usePayment.ts` imports and calls functions from `paymentService.ts`.
- `paymentService.ts` imports types from `payment.ts` and uses the shared `api/client.ts` for making HTTP requests.

**Cross-feature Contracts:**
- `paymentService.ts` calls the `payment-gateway` feature's API endpoints:
    - `POST /api/v1/payments/initiate` with `PaymentRequest` (orderId: UUID, amount: BigDecimal) expecting `PaymentResponse` (paymentId: String, redirectUrl: String).
    - `POST /api/v1/payments/verify` with `PaymentVerificationRequest` (paymentId: String, orderId: String, signature: String, status: String) expecting `String` (verification status/message).

**Error Handling:**
- `paymentService.ts` functions should throw errors if the API calls fail. These errors should be caught and handled by `usePayment.ts`, which can then expose them to components for display to the user.

---

## Event Listing

**Name:** `event-listing`  
**Type:** FRONTEND  
**Change required:** true

**Files in this feature:**
- `frontend/src/hooks/useEvents.ts` — Custom React hook for fetching and managing event data using TanStack Query, exposing `useGetAllEvents()`, `useGetEventById(id: string)`, `useCreateEvent()`, `useUpdateEvent()`, and `useDeleteEvent()`.
- `frontend/src/services/eventService.ts` — Frontend service layer for interacting with the backend event API, providing `getAllEvents()`, `getEventById(id: string)`, `createEvent(event: Omit<EventDto, 'id'>)`, `updateEvent(id: string, event: EventDto)`, and `deleteEvent(id: string)`.
- `frontend/src/types/event.ts` — TypeScript types and interfaces for event data, mirroring the backend EventDto.
- `frontend/src/pages/EventsPage.tsx` — Public-facing page displaying a list of upcoming special events, using `useEvents.useGetAllEvents()` and rendering `EventsList`.
- `frontend/src/components/events/EventsList.tsx` — Component that renders a list of event cards, receiving `events: EventDto[]` as props and rendering an `EventCard` for each.
- `frontend/src/components/events/EventCard.tsx` — Component displaying summary information for a single event, receiving `event: EventDto` as props.
- `frontend/src/pages/admin/AdminEventsPage.tsx` — Admin page for managing events, using `useEvents` hooks for CRUD operations and rendering `EventsTable` and `EventForm`.
- `frontend/src/components/events/EventsTable.tsx` — Component displaying events in a table with edit and delete actions, receiving `events: EventDto[]`, `onEdit: (event: EventDto) => void`, and `onDelete: (id: string) => void` as props.
- `frontend/src/components/events/EventForm.tsx` — Form component for creating or editing an event, receiving `initialData?: EventDto`, `onSubmit: (event: EventDto) => void`, and `onCancel: () => void` as props.

**Feature Instruction:**

## Design Tokens
- Navbar: bg-[#1A202C] text-white
- Primary CTA: bg-[#D69E2E] hover:bg-[#c28b2a] text-white font-semibold rounded-full px-8 py-3 transition-all duration-200
- Brand text accent: text-[#D69E2E]
- Section bg: bg-[#F7FAFC] (odd sections) / bg-white (even sections)
- Card: bg-white rounded-xl shadow-md border border-gray-100 p-6
- Section container: <section className="py-16 px-4"><div className="max-w-7xl mx-auto">
- Hero h1: text-4xl md:text-6xl font-bold text-white
- Body: text-[#2D3748] leading-relaxed

This feature provides the frontend components and logic for displaying and managing special events at Circuit House. It includes public-facing pages to showcase upcoming events and an admin interface for event creation, editing, and deletion.

### Data Structures
- `EventDto`: Defined in `frontend/src/types/event.ts`, this interface mirrors the backend `EventDto` from the `event-management` feature. It includes `id: string`, `name: string`, `description: string`, `eventTime: string` (ISO 8601 format), and `imageUrl: string`.

### Public Event Listing (`EventsPage.tsx`, `EventsList.tsx`, `EventCard.tsx`)

1.  **`EventsPage.tsx`**: This page serves as the entry point for public event listings. It uses the `useEvents` hook to fetch all upcoming events. It displays a prominent heading "Upcoming Events at Circuit House" and then renders the `EventsList` component, passing the fetched events to it. The page is wrapped in the `Layout` component from the `static-pages` feature.

2.  **`useEvents.ts`**: This custom React hook leverages TanStack Query to manage event data. It exports `useGetAllEvents()` to fetch all events and `useGetEventById(id: string)` to fetch a single event. It also exports mutations for admin operations: `useCreateEvent()`, `useUpdateEvent()`, and `useDeleteEvent()`. These hooks interact with `eventService.ts`.

3.  **`eventService.ts`**: This service file contains asynchronous functions that make actual API calls to the backend `event-management` feature. It exports `getAllEvents(): Promise<EventDto[]>`, `getEventById(id: string): Promise<EventDto>`, `createEvent(event: Omit<EventDto, 'id'>): Promise<EventDto>`, `updateEvent(id: string, event: EventDto): Promise<EventDto>`, and `deleteEvent(id: string): Promise<void>`. It uses the `api/client.ts` for HTTP requests.

4.  **`EventsList.tsx`**: This component receives a `List<EventDto>` as props. It iterates through the list and renders an `EventCard` for each event. If no events are available, it displays a friendly message like "No upcoming events scheduled at the moment. Please check back soon!".

5.  **`EventCard.tsx`**: This component receives a single `EventDto` as props. It displays the event's `imageUrl`, `name`, `eventTime` (formatted for readability), and `description`. The design should be elegant, using the defined design tokens for styling.

### Admin Event Management (`AdminEventsPage.tsx`, `EventsTable.tsx`, `EventForm.tsx`)

1.  **`AdminEventsPage.tsx`**: This page provides the administrative interface for managing events. It uses `useEvents` to fetch all events for display in a table. It also utilizes the mutation hooks from `useEvents` for creating, updating, and deleting events. It manages state for the currently selected event for editing and the visibility of the `EventForm` and confirmation dialogs. The page is wrapped in the `AdminLayout` component from the `admin-portal` feature.

2.  **`EventsTable.tsx`**: This component receives a `List<EventDto>`, `onEdit: (event: EventDto) => void`, and `onDelete: (id: string) => void` as props. It renders a table displaying event details (`name`, `eventTime`, `description`). Each row includes action buttons for "Edit" and "Delete", which trigger the respective `onEdit` and `onDelete` callbacks.

3.  **`EventForm.tsx`**: This component is used for both creating and editing events. It receives `initialData?: EventDto`, `onSubmit: (event: EventDto) => void`, and `onCancel: () => void` as props. If `initialData` is provided, the form is pre-filled for editing; otherwise, it's for creating a new event. The form includes fields for `name`, `description`, `eventTime` (using an appropriate date/time picker), and `imageUrl`. It includes "Save" and "Cancel" buttons. The `onSubmit` callback is triggered with the form data when the form is submitted.

### Inter-file Wiring
- `EventsPage.tsx` calls `useEvents.useGetAllEvents()`.
- `AdminEventsPage.tsx` calls `useEvents.useGetAllEvents()`, `useEvents.useCreateEvent()`, `useEvents.useUpdateEvent()`, and `useEvents.useDeleteEvent()`.
- `useEvents.ts` calls functions from `eventService.ts`.
- `eventService.ts` makes HTTP requests using `api/client.ts`.
- `EventsPage.tsx` renders `EventsList.tsx`.
- `EventsList.tsx` renders `EventCard.tsx` for each event.
- `AdminEventsPage.tsx` renders `EventsTable.tsx` and `EventForm.tsx`.

### Error Handling
All API calls in `eventService.ts` should include basic error handling, logging errors to the console. The `useEvents` hooks will expose `isLoading` and `isError` states, and an `error` object, which `EventsPage.tsx` and `AdminEventsPage.tsx` should use to display loading indicators or error messages to the user.

---

## Infrastructure

**Name:** `infrastructure`  
**Type:** INFRA  
**Change required:** true

**Files in this feature:**
- `.github/workflows/ci.yml`

**Feature Instruction:**

_Not enriched (INFRA or skipped)._

---

