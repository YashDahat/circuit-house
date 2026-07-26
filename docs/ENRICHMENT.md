# Feature Enrichment — Attempt 1

Generated: 2026-07-26

Each section is one LLM call (~5–8K tokens). The instruction tells the generator how all files in the feature interact and what contracts they must honour.

---

## Shared Backend Utilities

**Name:** `shared-backend`  
**Type:** SHARED  
**Change required:** true

**Files in this feature:**
- `backend/src/main/java/com/circuithouse/exception/GlobalExceptionHandler.java` — Centralized exception handler for the backend, mapping specific exceptions to standardized HTTP responses.
- `backend/src/main/java/com/circuithouse/exception/ResourceNotFoundException.java` — Custom exception class to indicate that a requested resource could not be found.
- `backend/src/main/java/com/circuithouse/dto/ErrorResponse.java` — Data Transfer Object (DTO) for standardizing error messages returned by the API.
- `backend/src/main/java/com/circuithouse/controller/SpaController.java` — Controller responsible for forwarding all non-API and non-static requests to the frontend's index.html.
- `backend/src/main/java/com/circuithouse/config/DataSeeder.java` — Configuration component that populates the database with initial menu data on application startup.
- `backend/src/main/java/com/circuithouse/service/NotificationService.java` — Interface defining the contract for sending various types of notifications.
- `backend/src/main/java/com/circuithouse/service/EmailNotificationService.java` — Implementation of NotificationService that sends notifications via email.

**Feature Instruction:**

The `shared-backend` feature provides foundational utilities and error handling for the entire backend application. It includes a global exception handler, a custom `ResourceNotFoundException`, a standardized `ErrorResponse` DTO, a SPA controller to serve the React frontend, a data seeder for initial database population, and an interface for notification services with an email implementation.

`ResourceNotFoundException.java` is a custom exception that should be thrown by services when a requested entity cannot be found. For example, `MenuService.getMenuItemById(UUID id)` would throw `ResourceNotFoundException` if no menu item with the given ID exists.

`ErrorResponse.java` defines the standard JSON structure for error messages returned by the API. `GlobalExceptionHandler.java` is an `@ControllerAdvice` that intercepts exceptions thrown across all controllers. Specifically, it handles `ResourceNotFoundException` by returning an `ErrorResponse` with HTTP status 404 (Not Found) and `IllegalArgumentException` by returning an `ErrorResponse` with HTTP status 400 (Bad Request). Other uncaught exceptions will be handled as generic internal server errors (HTTP 500).

`SpaController.java` is a `@Controller` that ensures all non-API and non-static asset requests are forwarded to `index.html`. This is crucial for the React single-page application to handle client-side routing.

`DataSeeder.java` is an `@Component` that implements `CommandLineRunner`. Upon application startup, it will populate the database with initial data. It injects `MenuItemRepository` and `MenuItemCategoryRepository` from the `menu-management-backend` feature to seed menu categories and menu items. The seeding logic should ensure that categories are created first, and then menu items are created, referencing the newly created categories. This seeder is responsible for providing initial data for the public-facing menu.

`NotificationService.java` defines an interface for sending various types of notifications. `EmailNotificationService.java` is an implementation of this interface that sends notifications via email. Other services (e.g., `OrderService` from `order-core-backend`, `ReservationService` from `reservation-system-backend`) can inject `NotificationService` and call its `sendNotification` method to send confirmations or updates. The `sendNotification` method should take a recipient email address, a subject, and the notification body as parameters.

---

## Menu Management (Backend)

**Name:** `menu-management-backend`  
**Type:** BACKEND  
**Change required:** true

**Files in this feature:**
- `backend/src/main/java/com/circuithouse/model/MenuItem.java` — MODEL layer — represents a single food or beverage item on the menu, linked to a category.
- `backend/src/main/java/com/circuithouse/model/MenuItemCategory.java` — MODEL layer — represents a category for menu items.
- `backend/src/main/java/com/circuithouse/repository/MenuItemRepository.java` — REPOSITORY layer — provides CRUD operations for MenuItem entities and custom queries.
- `backend/src/main/java/com/circuithouse/repository/MenuItemCategoryRepository.java` — REPOSITORY layer — provides CRUD operations for MenuItemCategory entities.
- `backend/src/main/java/com/circuithouse/service/MenuService.java` — SERVICE layer — implements business logic for menu items and categories, exposing methods like getAllMenuItems(): List<MenuItemDto> and createMenuItem(MenuItemDto menuItemDto): MenuItemDto.
- `backend/src/main/java/com/circuithouse/controller/MenuController.java` — CONTROLLER layer — provides public-facing REST endpoints for fetching menu items and categories.
- `backend/src/main/java/com/circuithouse/controller/admin/AdminMenuController.java` — CONTROLLER layer — provides admin-only REST endpoints for CRUD operations on menu items and categories.
- `backend/src/main/java/com/circuithouse/dto/MenuItemDto.java` — DTO layer — Data Transfer Object for MenuItem entities, used in API requests and responses.
- `backend/src/main/java/com/circuithouse/dto/MenuItemCategoryDto.java` — DTO layer — Data Transfer Object for MenuItemCategory entities, used in API requests and responses.

**Feature Instruction:**

The Menu Management (Backend) feature provides a comprehensive API for managing and displaying Circuit House's menu items and categories. It consists of two model entities, `MenuItem` and `MenuItemCategory`, which represent the core data structures. `MenuItem` includes fields such as `name`, `description`, `price`, `imageUrl`, and a many-to-one relationship with `MenuItemCategory`. `MenuItemCategory` has `name` and `description` fields.

Two Spring Data JPA repositories, `MenuItemRepository` and `MenuItemCategoryRepository`, handle persistence for these entities. `MenuItemRepository` provides standard CRUD operations and a custom method `findByCategoryId(Long categoryId)` to retrieve menu items belonging to a specific category. `MenuItemCategoryRepository` offers standard CRUD operations.

`MenuService` encapsulates the business logic. It injects both `MenuItemRepository` and `MenuItemCategoryRepository`. It exposes methods for public consumption, such as `getAllMenuItems()` which returns a `List<MenuItemDto>`, `getMenuItemsByCategory(Long categoryId)` which returns a `List<MenuItemDto>`, and `getAllMenuItemCategories()` which returns a `List<MenuItemCategoryDto>`. For admin operations, it provides `createMenuItem(MenuItemDto menuItemDto)`, `updateMenuItem(Long id, MenuItemDto menuItemDto)`, `deleteMenuItem(Long id)`, `createMenuItemCategory(MenuItemCategoryDto categoryDto)`, `updateMenuItemCategory(Long id, MenuItemCategoryDto categoryDto)`, and `deleteMenuItemCategory(Long id)`. All DTOs are used for input and output to decouple the API from the internal entity structure. The service throws `ResourceNotFoundException` if an item or category is not found during update or delete operations.

`MenuController` is the public-facing REST controller, exposing read-only endpoints for the menu. It injects `MenuService` and provides `GET /api/v1/menus/items` to fetch all menu items, `GET /api/v1/menus/items/category/{categoryId}` to fetch items by category, and `GET /api/v1/menus/categories` to fetch all categories. These endpoints return lists of `MenuItemDto` or `MenuItemCategoryDto` respectively.

`AdminMenuController` is the admin-only REST controller for full CRUD operations. It also injects `MenuService`. It provides `POST /api/v1/admin/menus/items` to create a new menu item, `PUT /api/v1/admin/menus/items/{id}` to update an existing menu item, `DELETE /api/v1/admin/menus/items/{id}` to delete a menu item, `POST /api/v1/admin/menus/categories` to create a new category, `PUT /api/v1/admin/menus/categories/{id}` to update a category, and `DELETE /api/v1/admin/menus/categories/{id}` to delete a category. All admin endpoints require authentication and administrator privileges.

`MenuItemDto` and `MenuItemCategoryDto` are Data Transfer Objects used to expose menu data through the API, ensuring that internal entity details are not directly exposed. `MenuItemDto` includes fields like `id`, `name`, `description`, `price`, `imageUrl`, and `categoryId`. `MenuItemCategoryDto` includes `id`, `name`, and `description`.

Error handling is consistent across controllers, utilizing Spring's `@ExceptionHandler` to return appropriate HTTP status codes and error messages for `ResourceNotFoundException` (404 Not Found) and `IllegalArgumentException` (400 Bad Request).

---

## Reservation System (Backend)

**Name:** `reservation-system-backend`  
**Type:** BACKEND  
**Change required:** true

**Files in this feature:**
- `backend/src/main/java/com/circuithouse/model/Reservation.java` — MODEL layer — defines the `Reservation` entity for database persistence, including its fields and relationships.
- `backend/src/main/java/com/circuithouse/model/ReservationStatus.java` — MODEL layer — defines an enum for the possible states of a reservation.
- `backend/src/main/java/com/circuithouse/repository/ReservationRepository.java` — REPOSITORY layer — provides data access operations for `Reservation` entities, including custom queries for filtering by status and time.
- `backend/src/main/java/com/circuithouse/service/ReservationService.java` — SERVICE layer — implements `createReservation(CreateReservationRequest): ReservationDto`, `getReservationById(UUID): ReservationDto`, `getAllReservations(): List<ReservationDto>`, `getReservationsByStatus(ReservationStatus): List<ReservationDto>`, `updateReservationStatus(UUID, UpdateReservationStatusRequest): ReservationDto`, and `deleteReservation(UUID): void`.
- `backend/src/main/java/com/circuithouse/controller/ReservationController.java` — CONTROLLER layer — exposes public REST endpoints for creating new table reservations.
- `backend/src/main/java/com/circuithouse/controller/admin/AdminReservationController.java` — CONTROLLER layer — exposes admin-only REST endpoints for viewing and managing all reservations.
- `backend/src/main/java/com/circuithouse/dto/CreateReservationRequest.java` — DTO layer — defines the data structure for requests to create new reservations.
- `backend/src/main/java/com/circuithouse/dto/ReservationDto.java` — DTO layer — defines the data structure for exposing reservation details in API responses.
- `backend/src/main/java/com/circuithouse/dto/UpdateReservationStatusRequest.java` — DTO layer — defines the data structure for requests to update a reservation's status by an admin.

**Feature Instruction:**

The Reservation System (Backend) feature provides a robust API for managing table reservations at Circuit House. It includes models for `Reservation` and `ReservationStatus`, a Spring Data JPA repository for persistence, a service layer for business logic, and two controllers: one for public reservation creation and another for admin-specific management.

### Data Models
- `Reservation.java`: Represents a single reservation with fields such as `id`, `customerName`, `customerEmail`, `customerPhone`, `reservationTime`, `numberOfGuests`, `status`, and `notes`. The `status` field will be an enum of type `ReservationStatus`.
- `ReservationStatus.java`: An enum defining the possible states of a reservation: `PENDING`, `CONFIRMED`, `CANCELLED`, `COMPLETED`, `NO_SHOW`.

### Data Transfer Objects (DTOs)
- `CreateReservationRequest.java`: Used for public reservation requests. It includes `customerName`, `customerEmail`, `customerPhone`, `reservationTime`, `numberOfGuests`, and `notes`. All fields except `notes` are mandatory. `customerEmail` must be a valid email format, and `numberOfGuests` must be between 1 and 20.
- `ReservationDto.java`: Used for exposing reservation details in API responses. It includes `id`, `customerName`, `customerEmail`, `customerPhone`, `reservationTime`, `numberOfGuests`, `status`, and `notes`.
- `UpdateReservationStatusRequest.java`: Used by administrators to update a reservation's status. It contains `status` (of type `ReservationStatus`) and an optional `notes` field.

### Persistence Layer
- `ReservationRepository.java`: Extends `JpaRepository<Reservation, UUID>` and provides standard CRUD operations. It will also include custom query methods to find reservations by `reservationTime` (for availability checks) and `status`.

### Service Layer
- `ReservationService.java`: This service orchestrates the business logic for reservations. It injects `ReservationRepository` for data access and `NotificationService` from the `shared-backend` feature for sending email notifications.
  - `createReservation(CreateReservationRequest request)`: 
    1. Validates the incoming request. 
    2. Checks for table availability at the requested `reservationTime` and `numberOfGuests`. If no tables are available, it throws an `IllegalArgumentException`.
    3. Creates a new `Reservation` entity with `PENDING` status.
    4. Saves the reservation using `reservationRepository.save()`.
    5. Calls `notificationService.sendNotification(request.getCustomerEmail(), "Reservation Confirmation - Circuit House", "Your reservation for " + request.getNumberOfGuests() + " guests at " + request.getReservationTime() + " is pending confirmation.")`.
    6. Returns a `ReservationDto` representation of the created reservation.
  - `getReservationById(UUID id)`: 
    1. Retrieves a reservation by its `id` using `reservationRepository.findById()`.
    2. If not found, throws a `ResourceNotFoundException`.
    3. Returns a `ReservationDto`.
  - `getAllReservations()`: 
    1. Retrieves all reservations from the repository.
    2. Returns a `List<ReservationDto>`.
  - `getReservationsByStatus(ReservationStatus status)`: 
    1. Retrieves reservations filtered by `status` using a custom repository method.
    2. Returns a `List<ReservationDto>`.
  - `updateReservationStatus(UUID id, UpdateReservationStatusRequest request)`: 
    1. Retrieves the reservation by `id`. If not found, throws a `ResourceNotFoundException`.
    2. Updates the `status` and `notes` fields of the reservation entity.
    3. Saves the updated reservation using `reservationRepository.save()`.
    4. If the status is `CONFIRMED`, sends a confirmation email: `notificationService.sendNotification(reservation.getCustomerEmail(), "Reservation Confirmed - Circuit House", "Your reservation for " + reservation.getNumberOfGuests() + " guests at " + reservation.getReservationTime() + " has been confirmed.")`.
    5. If the status is `CANCELLED`, sends a cancellation email: `notificationService.sendNotification(reservation.getCustomerEmail(), "Reservation Cancelled - Circuit House", "Your reservation for " + reservation.getNumberOfGuests() + " guests at " + reservation.getReservationTime() + " has been cancelled.")`.
    6. Returns a `ReservationDto` of the updated reservation.
  - `deleteReservation(UUID id)`: 
    1. Retrieves the reservation by `id`. If not found, throws a `ResourceNotFoundException`.
    2. Deletes the reservation using `reservationRepository.deleteById()`.

### Controller Layer
- `ReservationController.java`: Exposes public API endpoints for creating reservations.
  - `POST /api/v1/reservations`: Accepts `CreateReservationRequest` and calls `reservationService.createReservation()`. Returns `201 Created` with `ReservationDto` on success, `400 Bad Request` for validation errors, or `404 Not Found` if no tables are available.
- `AdminReservationController.java`: Exposes admin-only API endpoints for managing reservations.
  - `GET /api/v1/admin/reservations`: Calls `reservationService.getAllReservations()`. Returns `200 OK` with `List<ReservationDto>`.
  - `GET /api/v1/admin/reservations/{id}`: Calls `reservationService.getReservationById(id)`. Returns `200 OK` with `ReservationDto` or `404 Not Found`.
  - `GET /api/v1/admin/reservations/status/{status}`: Calls `reservationService.getReservationsByStatus(status)`. Returns `200 OK` with `List<ReservationDto>`.
  - `PUT /api/v1/admin/reservations/{id}/status`: Accepts `UpdateReservationStatusRequest` and calls `reservationService.updateReservationStatus(id, request)`. Returns `200 OK` with `ReservationDto` or `404 Not Found`.
  - `DELETE /api/v1/admin/reservations/{id}`: Calls `reservationService.deleteReservation(id)`. Returns `204 No Content` or `404 Not Found`.

Error Handling: All controllers will leverage the `GlobalExceptionHandler` from the `shared-backend` feature to provide consistent error responses (e.g., `ResourceNotFoundException` maps to `404 Not Found`, `IllegalArgumentException` maps to `400 Bad Request`).

---

## Order Management Core (Backend)

**Name:** `order-core-backend`  
**Type:** BACKEND  
**Change required:** true

**Files in this feature:**
- `backend/src/main/java/com/circuithouse/model/Order.java` — MODEL layer — represents a customer's online food order with associated items and status.
- `backend/src/main/java/com/circuithouse/model/OrderItem.java` — MODEL layer — represents a single line item within an Order, linking to a MenuItem.
- `backend/src/main/java/com/circuithouse/model/OrderStatus.java` — MODEL layer — enum defining the possible states of an order.
- `backend/src/main/java/com/circuithouse/repository/OrderRepository.java` — REPOSITORY layer — Spring Data JPA repository for CRUD operations on Order entities.
- `backend/src/main/java/com/circuithouse/repository/OrderItemRepository.java` — REPOSITORY layer — Spring Data JPA repository for CRUD operations on OrderItem entities.
- `backend/src/main/java/com/circuithouse/service/OrderService.java` — SERVICE layer — implements createOrder(CreateOrderRequest): OrderResponseDto, getOrderById(UUID): OrderResponseDto, and updateOrderStatus(UUID, UpdateOrderStatusRequest): OrderResponseDto; delegates persistence to OrderRepository and OrderItemRepository, menu item validation to MenuItemRepository, and notifications to NotificationService.

**Feature Instruction:**

This feature, Order Management Core (Backend), provides the foundational models, repositories, and service logic for handling customer food orders. It defines the `Order` and `OrderItem` entities, their respective JPA repositories, and an `OrderStatus` enum. The `OrderService` orchestrates the creation and management of orders, interacting with `OrderRepository`, `OrderItemRepository`, and `MenuItemRepository` (from the `menu-management-backend` feature) to validate menu items. It also integrates with `NotificationService` (from the `shared-backend` feature) to send notifications upon order creation or status updates. The `OrderService` will expose methods for creating new orders, retrieving order details, and updating order statuses. It will handle the initial status of an order as `PENDING_PAYMENT` and transition it through various stages. Error handling will include `ResourceNotFoundException` for non-existent orders or menu items, and `IllegalArgumentException` for invalid order states or requests.

---

## Order Management API (Backend)

**Name:** `order-api-backend`  
**Type:** BACKEND  
**Change required:** true

**Files in this feature:**
- `backend/src/main/java/com/circuithouse/controller/OrderController.java` — CONTROLLER layer — exposes public REST endpoints for creating new orders via `createOrder(CreateOrderRequest)` and retrieving order status via `getOrderById(UUID)`.
- `backend/src/main/java/com/circuithouse/controller/admin/AdminOrderController.java` — CONTROLLER layer — exposes admin-only REST endpoints for viewing all orders via `getAllOrders()`, filtering by status via `getOrdersByStatus(OrderStatus)`, and updating order status via `updateOrderStatus(UUID, UpdateOrderStatusRequest)`.
- `backend/src/main/java/com/circuithouse/dto/CreateOrderRequest.java` — DTO layer — defines the structure for incoming requests to create a new order.
- `backend/src/main/java/com/circuithouse/dto/OrderItemRequest.java` — DTO layer — defines the structure for a single item within a `CreateOrderRequest`.
- `backend/src/main/java/com/circuithouse/dto/OrderResponseDto.java` — DTO layer — defines the structure for order details returned in API responses.
- `backend/src/main/java/com/circuithouse/dto/OrderItemDto.java` — DTO layer — defines the structure for a single item within an `OrderResponseDto`.
- `backend/src/main/java/com/circuithouse/dto/UpdateOrderStatusRequest.java` — DTO layer — defines the structure for incoming requests to update an order's status.

**Feature Instruction:**

The Order Management API (Backend) feature provides RESTful endpoints for customers to create and track their orders, and for administrators to view and manage all orders. This feature interacts with the `order-core-backend` feature for core order logic and persistence, and with the `menu-management-backend` feature to validate menu item IDs.

## Public Order Endpoints
`OrderController` exposes public endpoints for order creation and status lookup. The `createOrder` endpoint (`POST /api/v1/orders`) accepts a `CreateOrderRequest` DTO, which includes customer details, delivery address, and a list of `OrderItemRequest` objects. Each `OrderItemRequest` specifies a `menuItemId` and `quantity`. The controller delegates the order creation to `OrderService.createOrder(CreateOrderRequest request)`. Upon successful creation, it returns an `OrderResponseDto` with HTTP status 201 (Created). If the `menuItemId` is invalid or other business rules are violated, `OrderService` will throw an `IllegalArgumentException`, which `GlobalExceptionHandler` will catch and return a 400 Bad Request.

The `getOrderById` endpoint (`GET /api/v1/orders/{orderId}`) allows customers to retrieve the details of a specific order using its `UUID`. It calls `OrderService.getOrderById(UUID id)`. If the order is not found, `OrderService` throws a `ResourceNotFoundException`, resulting in a 404 Not Found response.

## Admin Order Endpoints
`AdminOrderController` provides administrative endpoints under `/api/v1/admin/orders` for managing all orders. These endpoints require administrator authentication.

- `getAllOrders` (`GET /api/v1/admin/orders`): Retrieves a list of all orders. It calls `OrderService.getAllOrders()` and returns a `List<OrderResponseDto>`.
- `getOrdersByStatus` (`GET /api/v1/admin/orders/status/{status}`): Retrieves orders filtered by `OrderStatus`. It calls `OrderService.getOrdersByStatus(OrderStatus status)`.
- `updateOrderStatus` (`PUT /api/v1/admin/orders/{id}/status`): Updates the status of a specific order. It accepts an `UpdateOrderStatusRequest` containing the new `OrderStatus`. It calls `OrderService.updateOrderStatus(UUID id, UpdateOrderStatusRequest request)`. If the order is not found, it throws `ResourceNotFoundException` (404 Not Found). If the status transition is invalid, it throws `IllegalArgumentException` (400 Bad Request).

## Data Transfer Objects (DTOs)
This feature defines several DTOs for request and response payloads:
- `CreateOrderRequest`: Used for creating new orders. Contains `customerName`, `customerEmail`, `customerPhone`, `deliveryAddress`, and a list of `OrderItemRequest`.
- `OrderItemRequest`: Represents a single item in an order request, with `menuItemId` and `quantity`.
- `OrderResponseDto`: Used for returning order details in API responses. Includes `id`, `customerName`, `customerEmail`, `customerPhone`, `deliveryAddress`, `orderTime`, `totalAmount`, `status`, and a list of `OrderItemDto`.
- `OrderItemDto`: Represents a single item within an `OrderResponseDto`, with `id`, `menuItemId`, `name`, `quantity`, and `price`.
- `UpdateOrderStatusRequest`: Used by admins to update an order's status, containing the `status` field.

All DTOs use standard Java types and include appropriate Bean Validation annotations (e.g., `@NotNull`, `@NotBlank`, `@Min`, `@Valid`) to ensure data integrity at the API boundary.

## Service Layer Interaction
Both `OrderController` and `AdminOrderController` inject `OrderService` from the `order-core-backend` feature. `OrderService` is responsible for the business logic of order creation, retrieval, and status updates. It will internally interact with `MenuItemRepository` from `menu-management-backend` to validate `menuItemId`s during order creation. The `OrderService` also handles the persistence of orders and order items through `OrderRepository` and `OrderItemRepository` (both from `order-core-backend`).

---

## Event Management (Backend)

**Name:** `event-management-backend`  
**Type:** BACKEND  
**Change required:** true

**Files in this feature:**
- `backend/src/main/java/com/circuithouse/model/Event.java` — JPA Entity — represents a special event with fields for its details and status.
- `backend/src/main/java/com/circuithouse/repository/EventRepository.java` — REPOSITORY layer — provides CRUD operations for Event entities and custom queries for active events.
- `backend/src/main/java/com/circuithouse/service/EventService.java` — SERVICE layer — implements business logic for managing events, including createEvent(EventDto), getEventById(UUID), getAllActiveEvents(), updateEvent(UUID, EventDto), deleteEvent(UUID), and getAllEvents().
- `backend/src/main/java/com/circuithouse/controller/EventController.java` — CONTROLLER layer — exposes public REST endpoints for fetching event information.
- `backend/src/main/java/com/circuithouse/controller/admin/AdminEventController.java` — CONTROLLER layer — exposes admin-only REST endpoints for CRUD operations on events.
- `backend/src/main/java/com/circuithouse/dto/EventDto.java` — Data Transfer Object — used for transferring event data between layers, ensuring data validation.

**Feature Instruction:**

The Event Management (Backend) feature provides a complete set of functionalities for managing special events at Circuit House. This includes defining the Event entity, persisting event data, implementing business logic for event operations, and exposing RESTful API endpoints for both public access (read-only) and authenticated administration (CRUD operations).

**Event Entity (`Event.java`)**
This JPA entity represents a special event. It includes fields for `id` (UUID, primary key), `name` (String, not null, max 255), `description` (String, not null), `eventDate` (LocalDateTime, not null), `imageUrl` (String, nullable, max 255), and `active` (boolean, not null, default true).

**Event Repository (`EventRepository.java`)**
This Spring Data JPA repository extends `JpaRepository<Event, UUID>` to provide standard CRUD operations for `Event` entities. It will also include a custom query method `findByActiveTrueOrderByEventDateAsc()` to fetch all active events, ordered by their date in ascending order.

**Event DTO (`EventDto.java`)**
This DTO is used for transferring event data between the service layer and the controllers. It mirrors the `Event` entity fields: `id` (UUID), `name` (String, @NotBlank, @Size(max=255)), `description` (String, @NotBlank), `eventDate` (LocalDateTime, @NotNull), `imageUrl` (String, @Size(max=255)), and `active` (boolean).

**Event Service (`EventService.java`)**
`EventService` handles the core business logic for events. It injects `EventRepository`.

- `getAllActiveEvents()`: Returns `List<EventDto>` of all active events, ordered by `eventDate`. It calls `eventRepository.findByActiveTrueOrderByEventDateAsc()` and maps the `Event` entities to `EventDto`.
- `getEventById(UUID id)`: Returns `EventDto` for the given `id`. If the event is not found, it throws a `ResourceNotFoundException`.
- `createEvent(EventDto eventDto)`: Creates a new event. It validates the `eventDto`, converts it to an `Event` entity, sets `active` to true, saves it using `eventRepository.save()`, and returns the saved entity as an `EventDto`.
- `updateEvent(UUID id, EventDto eventDto)`: Updates an existing event. It first fetches the existing event using `eventRepository.findById(id)`. If not found, it throws a `ResourceNotFoundException`. It then updates the fields from `eventDto` (name, description, eventDate, imageUrl, active), saves the updated entity, and returns it as an `EventDto`.
- `deleteEvent(UUID id)`: Deletes an event by `id`. It first checks if the event exists using `eventRepository.existsById(id)`. If not found, it throws a `ResourceNotFoundException`. It then calls `eventRepository.deleteById(id)`.

**Event Controller (`EventController.java`)**
This controller exposes public, read-only API endpoints for events. It injects `EventService`.

- `getAllEvents()`: `GET /api/v1/events`. Returns `ResponseEntity<List<EventDto>>` containing all active events. Calls `eventService.getAllActiveEvents()`.
- `getEventById(UUID id)`: `GET /api/v1/events/{id}`. Returns `ResponseEntity<EventDto>` for a specific event. Calls `eventService.getEventById(id)`. Throws `ResourceNotFoundException` if the event is not found, which is handled by `GlobalExceptionHandler` to return a 404.

**Admin Event Controller (`AdminEventController.java`)**
This controller exposes admin-only API endpoints for CRUD operations on events. It injects `EventService`.

- `getAllEvents()`: `GET /api/v1/admin/events`. Returns `ResponseEntity<List<EventDto>>` containing all events (active or inactive). Calls `eventService.getAllEvents()` (a new method to be added to `EventService` that returns all events regardless of active status).
- `getEventById(UUID id)`: `GET /api/v1/admin/events/{id}`. Returns `ResponseEntity<EventDto>` for a specific event. Calls `eventService.getEventById(id)`. Throws `ResourceNotFoundException` if the event is not found, which is handled by `GlobalExceptionHandler` to return a 404.
- `createEvent(EventDto eventDto)`: `POST /api/v1/admin/events`. Creates a new event. Returns `ResponseEntity<EventDto>` with HTTP status 201 (Created). Calls `eventService.createEvent(eventDto)`.
- `updateEvent(UUID id, EventDto eventDto)`: `PUT /api/v1/admin/events/{id}`. Updates an existing event. Returns `ResponseEntity<EventDto>`. Calls `eventService.updateEvent(id, eventDto)`. Throws `ResourceNotFoundException` if the event is not found, handled by `GlobalExceptionHandler` to return a 404.
- `deleteEvent(UUID id)`: `DELETE /api/v1/admin/events/{id}`. Deletes an event. Returns `ResponseEntity<Void>` with HTTP status 204 (No Content). Calls `eventService.deleteEvent(id)`. Throws `ResourceNotFoundException` if the event is not found, handled by `GlobalExceptionHandler` to return a 404.

**Error Handling**
All controllers rely on the `shared-backend`'s `GlobalExceptionHandler` to handle `ResourceNotFoundException` (returning 404 Not Found) and `IllegalArgumentException` (returning 400 Bad Request) and other generic exceptions (returning 500 Internal Server Error).

---

## Testimonial Management (Backend)

**Name:** `testimonial-management-backend`  
**Type:** BACKEND  
**Change required:** true

**Files in this feature:**
- `backend/src/main/java/com/circuithouse/model/Testimonial.java` — JPA Entity — represents a customer testimonial in the database.
- `backend/src/main/java/com/circuithouse/repository/TestimonialRepository.java` — REPOSITORY layer — provides data access operations for Testimonial entities, including findByApprovedTrueOrderByDateDesc().
- `backend/src/main/java/com/circuithouse/service/TestimonialService.java` — SERVICE layer — implements business logic for testimonials, including getAllApprovedTestimonials(): List<TestimonialDto>, getAllTestimonials(): List<TestimonialDto>, getTestimonialById(UUID): TestimonialDto, createTestimonial(TestimonialDto): TestimonialDto, updateTestimonial(UUID, TestimonialDto): TestimonialDto, and deleteTestimonial(UUID): void.
- `backend/src/main/java/com/circuithouse/controller/TestimonialController.java` — CONTROLLER layer — exposes public API endpoint GET /api/v1/testimonials for fetching approved testimonials.
- `backend/src/main/java/com/circuithouse/controller/admin/AdminTestimonialController.java` — CONTROLLER layer — exposes admin API endpoints for CRUD operations on testimonials, including GET /api/v1/admin/testimonials, GET /api/v1/admin/testimonials/{id}, POST /api/v1/admin/testimonials, PUT /api/v1/admin/testimonials/{id}, and DELETE /api/v1/admin/testimonials/{id}.
- `backend/src/main/java/com/circuithouse/dto/TestimonialDto.java` — DTO — Data Transfer Object for Testimonial entities, used for request and response bodies.

**Feature Instruction:**

The Testimonial Management (Backend) feature provides a robust system for managing customer testimonials. It consists of a `Testimonial` JPA entity, a `TestimonialRepository` for data access, a `TestimonialService` for business logic, and two controllers: `TestimonialController` for public access to approved testimonials, and `AdminTestimonialController` for administrative CRUD operations. A `TestimonialDto` is used for data transfer between the service and controllers.

**Testimonial.java** defines the `Testimonial` entity with fields for `id`, `author`, `content`, `rating`, `date`, and `approved`. The `id` is a UUID, `author` and `content` are strings, `rating` is an integer between 1 and 5, `date` is a `LocalDateTime`, and `approved` is a boolean.

**TestimonialRepository.java** extends `JpaRepository<Testimonial, UUID>` and provides standard CRUD operations. It also includes a custom query method `findByApprovedTrueOrderByDateDesc()` to retrieve all approved testimonials, ordered by date in descending order.

**TestimonialService.java** orchestrates the business logic. It injects `TestimonialRepository`. The `TestimonialService` exposes the following public methods:
- `getAllApprovedTestimonials()`: Returns a `List<TestimonialDto>` of all testimonials where `approved` is true, ordered by `date` descending. It calls `testimonialRepository.findByApprovedTrueOrderByDateDesc()` and maps the entities to DTOs.
- `getAllTestimonials()`: Returns a `List<TestimonialDto>` of all testimonials, ordered by `date` descending. It calls `testimonialRepository.findAll(Sort.by(Sort.Direction.DESC, "date"))` and maps the entities to DTOs.
- `getTestimonialById(UUID id)`: Returns a `TestimonialDto` for the given ID. It calls `testimonialRepository.findById(id)` and throws a `ResourceNotFoundException` if the testimonial is not found.
- `createTestimonial(TestimonialDto testimonialDto)`: Creates a new testimonial. It maps the DTO to an entity, sets the `date` to `LocalDateTime.now()`, sets `approved` to `false` by default, saves it via `testimonialRepository.save()`, and returns the saved entity as a `TestimonialDto`. The `rating` must be between 1 and 5 (inclusive), otherwise an `IllegalArgumentException` is thrown.
- `updateTestimonial(UUID id, TestimonialDto testimonialDto)`: Updates an existing testimonial. It retrieves the testimonial by ID, updates its fields (author, content, rating, approved) from the DTO, saves it, and returns the updated entity as a `TestimonialDto`. Throws `ResourceNotFoundException` if the testimonial is not found. The `rating` must be between 1 and 5 (inclusive), otherwise an `IllegalArgumentException` is thrown.
- `deleteTestimonial(UUID id)`: Deletes a testimonial by ID. Throws `ResourceNotFoundException` if the testimonial is not found.

**TestimonialDto.java** is a DTO for `Testimonial` entities. It includes fields for `id`, `author`, `content`, `rating`, `date`, and `approved`. It uses Bean Validation annotations: `author` and `content` are `@NotBlank`, `rating` is `@NotNull` and `@Min(1)` / `@Max(5)`, `date` is `@NotNull`.

**TestimonialController.java** handles public API requests. It injects `TestimonialService`. It exposes a GET endpoint `/api/v1/testimonials` that returns a `List<TestimonialDto>` of all approved testimonials by calling `testimonialService.getAllApprovedTestimonials()`.

**AdminTestimonialController.java** handles administrative API requests. It injects `TestimonialService`. It exposes the following endpoints:
- GET `/api/v1/admin/testimonials`: Returns a `List<TestimonialDto>` of all testimonials by calling `testimonialService.getAllTestimonials()`.
- GET `/api/v1/admin/testimonials/{id}`: Returns a `TestimonialDto` for a specific testimonial by calling `testimonialService.getTestimonialById(id)`. Returns 404 if not found.
- POST `/api/v1/admin/testimonials`: Creates a new testimonial. Expects a `TestimonialDto` in the request body. Calls `testimonialService.createTestimonial()`. Returns 400 if validation fails.
- PUT `/api/v1/admin/testimonials/{id}`: Updates an existing testimonial. Expects a `TestimonialDto` in the request body. Calls `testimonialService.updateTestimonial()`. Returns 404 if not found, 400 if validation fails.
- DELETE `/api/v1/admin/testimonials/{id}`: Deletes a testimonial by ID. Calls `testimonialService.deleteTestimonial()`. Returns 404 if not found.

---

## Core Frontend

**Name:** `core-frontend`  
**Type:** FRONTEND  
**Change required:** true

**Files in this feature:**
- `frontend/src/api/client.ts` — SERVICE layer — configures the global Axios instance with base URL and an interceptor for attaching JWT tokens and handling 401 errors.
- `frontend/src/App.tsx` — Root component — sets up the main router, application-wide contexts, and defines public and admin routes.
- `frontend/src/components/Layout.tsx` — COMPONENT layer — provides the consistent layout for all public pages, including header, footer, and a main content area.
- `frontend/src/components/Header.tsx` — COMPONENT layer — renders the site-wide header with logo, navigation links, and a call-to-action button.
- `frontend/src/components/Footer.tsx` — COMPONENT layer — renders the site-wide footer with contact information, social links, and quick navigation.
- `frontend/src/utils/seoUtils.ts` — UTILITY layer — provides functions for generating and embedding JSON-LD schema markup for SEO.

**Feature Instruction:**

The `core-frontend` feature establishes the foundational structure and global utilities for the Circuit House restaurant's web application. It includes the main application entry point (`App.tsx`), the global Axios client configuration (`client.ts`), the primary public page layout (`Layout.tsx`), and its constituent components (`Header.tsx`, `Footer.tsx`), and SEO utilities (`seoUtils.ts`).

## Design Tokens
- Navbar: bg-[#1A202C] text-white
- Primary CTA: bg-[#D69E2E] hover:bg-[#C28B2A] text-white font-semibold rounded-full px-8 py-3 transition-all duration-200
- Brand text accent: text-[#D69E2E]
- Section bg: bg-[#F7FAFC] (odd sections) / bg-white (even sections)
- Card: bg-white rounded-xl shadow-md border border-gray-100 p-6
- Section container: <section className="py-16 px-4"><div className="max-w-7xl mx-auto">
- Hero h1: text-4xl md:text-6xl font-bold text-white
- Body: text-[#2D3748] leading-relaxed

### `client.ts`
This file configures the global Axios instance. It sets the `baseURL` to `/api/v1` for all requests. It also includes an interceptor that automatically attaches the JWT token from `localStorage` (using the key 'token') to the `Authorization` header for every outgoing request. This ensures that all authenticated API calls are made correctly. The interceptor also handles error responses, specifically logging 401 Unauthorized errors and redirecting to the login page if `AuthContext` is available.

### `App.tsx`
This is the root component of the application. It sets up the `BrowserRouter` from `react-router-dom` to manage client-side routing. It will wrap the entire application with necessary context providers, such as `AuthContext` (from `auth-frontend`) and `QueryClientProvider` (from `react-query`). The main routes for public pages (e.g., home, menu, about, contact, reservations, events, order, order status, order confirmation) and admin pages will be defined here. Public pages will use the `Layout` component, while admin pages will use `AdminLayout` (from `admin-portal-frontend`). A `ProtectedRoute` (from `auth-frontend`) will guard admin routes.

### `Layout.tsx`
This component provides the consistent layout for all public-facing pages. It renders the `Header` component at the top, the `Footer` component at the bottom, and a `main` content area in between. The `main` content area will receive `children` as props, allowing individual pages to inject their specific content. The layout ensures a responsive design and applies global styling based on the design tokens.

### `Header.tsx`
This component renders the site-wide header. It includes the Circuit House logo (linking to the home page), primary navigation links (Home, Menu, Reservations, Events, About, Contact), and a prominent 'Order Online' call-to-action button. The navigation links will use `NavLink` from `react-router-dom` for active link styling. The 'Order Online' button will navigate to the `/order` page. The header will be styled with `bg-[#1A202C]` and `text-white`.

### `Footer.tsx`
This component renders the site-wide footer. It displays the restaurant's contact information (address: Laxman Nagar, Baner, Pune, Maharashtra 411045; phone: 070587 56269), opening hours, social media links (placeholder icons), and quick navigation links (e.g., Privacy Policy, Terms of Service). The footer will be styled with `bg-[#1A202C]` and `text-white`.

### `seoUtils.ts`
This utility file provides functions to generate JSON-LD schema markup. The `generateRestaurantSchema` function will take restaurant details (name, address, phone, coordinates, opening hours, menu URL, reservation URL) and return a JSON-LD object for a `Restaurant` type. The `embedSchema` function will take a JSON-LD object and inject it into the document's `<head>` as a `<script type="application/ld+json">` tag. This will be used by pages like `HomePage.tsx` and `AboutPage.tsx` to enhance SEO.

---

## Authentication (Frontend)

**Name:** `auth-frontend`  
**Type:** FRONTEND  
**Change required:** true

**Files in this feature:**
- `frontend/src/context/AuthContext.tsx` — React context for managing global authentication state and user information. It provides `login(token: string, user: User)`, `logout()`, `user: User | null`, `token: string | null`, and `isAuthenticated: boolean` to its consumers.
- `frontend/src/hooks/useAuth.ts` — Custom hook for interacting with the authentication context and service. It exports `useAuth(): AuthContextType`.
- `frontend/src/services/authService.ts` — Service for making API calls to authentication endpoints. It exports `login(credentials: LoginRequest): Promise<LoginResponse>` and `getProfile(): Promise<User>`.
- `frontend/src/types/auth.ts` — TypeScript types and interfaces for authentication data structures. Generated from the backend API contract — auth domain.
- `frontend/src/pages/LoginPage.tsx` — Page with a simple form for administrators to log in.
- `frontend/src/components/ProtectedRoute.tsx` — A wrapper component that restricts access to routes unless the user is authenticated. It exports `ProtectedRoute({ children: React.ReactNode }): JSX.Element`.

**Feature Instruction:**

This feature provides the frontend authentication mechanism for the Circuit House restaurant's admin portal. It includes a React Context (`AuthContext.tsx`) to manage the global authentication state, a custom hook (`useAuth.ts`) for easy access to this context, a service (`authService.ts`) to interact with the backend authentication API, and TypeScript types (`auth.ts`) for data structures. The `LoginPage.tsx` provides the user interface for administrators to log in, and the `ProtectedRoute.tsx` component ensures that only authenticated users can access specific routes within the application.

## Design Tokens
- Navbar: bg-[#1A202C] text-white
- Primary CTA: bg-[#D69E2E] hover:bg-[#B78726] text-white font-semibold rounded-full px-8 py-3 transition-all duration-200
- Brand text accent: text-[#D69E2E]
- Section bg: bg-[#F7FAFC] (odd sections) / bg-gray-50 (even sections)
- Card: bg-white rounded-xl shadow-md border border-gray-100 p-6
- Section container: <section className="py-16 px-4"><div className="max-w-7xl mx-auto">
- Hero h1: text-4xl md:text-6xl font-bold text-white
- Body: text-[#2D3748] leading-relaxed

### `AuthContext.tsx`
This file defines the `AuthContext` and `AuthProvider`. The `AuthProvider` component will wrap the entire application or the part of the application that requires authentication. It manages the `user` state (of type `User | null`) and the `token` state (of type `string | null`). The `token` is stored in `localStorage` under the key 'token'.

The `AuthProvider` provides the following functions to its consumers:
- `login(token: string, user: User)`: Stores the token in `localStorage` and updates the `user` and `token` states.
- `logout()`: Removes the token from `localStorage` and clears the `user` and `token` states.
- `isAuthenticated`: A boolean derived from the presence of a token.

### `useAuth.ts`
This custom hook simplifies access to the `AuthContext`. It exports a single function, `useAuth()`, which returns the authentication context values (user, token, login, logout, isAuthenticated). This hook will be used by components like `LoginPage.tsx` and `ProtectedRoute.tsx` to interact with the authentication state.

### `authService.ts`
This service handles API calls related to authentication. It exports two asynchronous functions:
- `login(credentials: LoginRequest): Promise<LoginResponse>`: This function takes `LoginRequest` (email and password) as input, makes a POST request to `/api/v1/auth/login`, and returns a `LoginResponse` (containing the JWT token and user details). On success, it calls `localStorage.setItem('token', response.token)`.
- `getProfile(): Promise<User>`: This function makes a GET request to `/api/v1/auth/profile` to fetch the authenticated user's profile information. It expects the JWT token to be present in the request headers (handled by the `api/client.ts` interceptor).

### `auth.ts`
This file defines the TypeScript interfaces for authentication-related data structures:
- `User`: Represents the authenticated user with fields like `id: string`, `email: string`, `role: 'ADMIN' | 'CUSTOMER'`, `name: string`.
- `LoginRequest`: Represents the request body for login, with fields `email: string` and `password: string`.
- `LoginResponse`: Represents the response body after a successful login, with fields `token: string` and `user: User`.

### `LoginPage.tsx`
This page provides the login form for administrators. It uses the `useAuth` hook to access the `login` function. Upon successful login, it redirects the user to the admin dashboard (`/admin/dashboard`). The form will have fields for email and password. The layout will be clean and centered, reflecting the elegant and modern design.

- **Structure:** The page will use the `<Layout>` component from `@/components/Layout` for consistent styling. The main content will be a centered card containing the login form.
- **Styling:** The card will use `bg-white rounded-xl shadow-md border border-gray-100 p-8` for its appearance. Input fields will have a subtle border and focus styling. The login button will use the Primary CTA design token: `bg-[#D69E2E] hover:bg-[#B78726] text-white font-semibold rounded-full px-8 py-3 transition-all duration-200`.
- **Content:** The heading will be "Admin Login" in a confident tone. Placeholder text for email and password fields will be clear and concise.

### `ProtectedRoute.tsx`
This component acts as a wrapper for routes that require authentication. It uses the `useAuth` hook to check if the user is authenticated. If not, it redirects the user to the `/login` page. If authenticated, it renders the `children` components. This component will be used in `App.tsx` (from `core-frontend`) to protect admin routes.

---

## Static Pages (Frontend)

**Name:** `static-pages-frontend`  
**Type:** FRONTEND  
**Change required:** true

**Files in this feature:**
- `frontend/src/pages/HomePage.tsx` — PAGE layer — orchestrates the display of the hero section, featured menu items, testimonials, and calls to action.
- `frontend/src/components/home/HeroSection.tsx` — COMPONENT layer — displays a full-bleed hero section with a background image, headline, and sub-headline.
- `frontend/src/components/home/FeaturedMenuItems.tsx` — COMPONENT layer — displays a grid of featured menu items by consuming the `useMenu` hook.
- `frontend/src/components/home/TestimonialsCarousel.tsx` — COMPONENT layer — displays an interactive carousel of customer testimonials by consuming the `useTestimonials` hook.
- `frontend/src/components/home/CallToActionSection.tsx` — COMPONENT layer — provides prominent calls to action for reservations and online ordering.
- `frontend/src/pages/AboutPage.tsx` — PAGE layer — displays static content about the restaurant's story, ambiance, and culinary philosophy.
- `frontend/src/pages/ContactPage.tsx` — PAGE layer — displays contact details, business hours, and an embedded Google Map.
- `frontend/src/components/contact/ContactInfoCard.tsx` — COMPONENT layer — displays the restaurant's address, phone number, and WhatsApp contact.
- `frontend/src/components/contact/GoogleMapsEmbed.tsx` — COMPONENT layer — embeds an interactive Google Map showing the restaurant's location.
- `frontend/src/pages/NotFoundPage.tsx` — PAGE layer — handles invalid routes by displaying a user-friendly 404 message.

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

This feature provides the static public-facing pages for Circuit House, including the homepage, about us, contact, and a 404 not found page. It focuses on presenting an elegant and modern user experience with high-quality visuals and enticing copy, adhering strictly to the provided design tokens.

### HomePage.tsx
This page serves as the main landing page. It orchestrates several components to create a rich, immersive experience:
1.  **HeroSection**: Displays a full-bleed hero image with the restaurant's name and a compelling sub-headline. The image URL will be `https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=1920&q=80` with a `bg-black bg-opacity-50` overlay.
2.  **FeaturedMenuItems**: Fetches a curated list of menu items using the `useMenu` hook (from `menu-display-frontend`) and displays them in an appealing grid. It calls `useMenu().getAllMenuItems()`.
3.  **TestimonialsCarousel**: Fetches approved testimonials using the `useTestimonials` hook (from `testimonials-display-frontend`) and presents them in an interactive carousel. It calls `useTestimonials().getAllApprovedTestimonials()`.
4.  **CallToActionSection**: Provides prominent calls to action for reservations and online ordering.

All sections will use the `Section container` design token for consistent padding and max-width.

### HeroSection.tsx
This component renders the hero section for the `HomePage.tsx`. It will display the business name "Circuit House" as the main headline and a sub-headline like "Experience Culinary Excellence in Pune". It uses the specified hero image URL and overlay, applying `Hero h1` design tokens for the headline.

### FeaturedMenuItems.tsx
This component is responsible for displaying a grid of featured menu items. It will use the `useMenu` hook to fetch menu items. Each menu item will be rendered as a card, adhering to the `Card` design token. It will display the `name`, `description`, and `price` of each `MenuItemDto`.

### TestimonialsCarousel.tsx
This component renders an interactive carousel of customer testimonials. It will use the `useTestimonials` hook to fetch approved testimonials. Each testimonial will display the `author` and `content` from the `TestimonialDto`, styled according to the `Card` design token.

### CallToActionSection.tsx
This component presents two clear calls to action: one for making a reservation and another for ordering online. The buttons will use the `Primary CTA` design token. Placeholder text will be "Reserve Your Table" and "Order Online".

### AboutPage.tsx
This page will detail the story, ambiance, and culinary philosophy of Circuit House. It will contain several sections, each using the `Section container` design token and alternating `Section bg` colors. Content will be descriptive and enticing, reflecting the confident and welcoming tone. Example sections include "Our Story", "The Circuit House Experience", and "Our Culinary Philosophy".

### ContactPage.tsx
This page provides all necessary contact information for Circuit House. It will include:
1.  **ContactInfoCard**: Displays the restaurant's address, phone number (click-to-call), and WhatsApp contact. It will use the business context details: Address: "Laxman Nagar, Baner, Pune, Maharashtra 411045", Phone: "070587 56269".
2.  **GoogleMapsEmbed**: Embeds an interactive Google Map centered on the restaurant's coordinates: 18.570737, 73.776449. The map will be styled to fit the modern aesthetic.

### ContactInfoCard.tsx
This component displays the contact details. It will show the address, phone number (with a `tel:` link), and a WhatsApp button (with a `https://wa.me/` link). It will use the `Card` design token for its container.

### GoogleMapsEmbed.tsx
This component embeds an iframe for Google Maps, using the provided coordinates to center the map on Circuit House's location. The iframe will be responsive and styled to integrate seamlessly with the page.

### NotFoundPage.tsx
This page provides a user-friendly experience for invalid routes. It will display a clear "404 - Page Not Found" message and a button to navigate back to the homepage, styled with the `Primary CTA` design token. The tone will be helpful and apologetic.

---

## Menu Display (Frontend)

**Name:** `menu-display-frontend`  
**Type:** FRONTEND  
**Change required:** true

**Files in this feature:**
- `frontend/src/pages/MenuPage.tsx` — PAGE layer — orchestrates the display of menu categories and items, using the `useMenu` hook for data and rendering `MenuCategoryFilter` and `MenuItemsGrid` components.
- `frontend/src/hooks/useMenu.ts` — HOOK layer — provides `menuItems: MenuItem[]`, `categories: MenuItemCategory[]`, `isLoading: boolean`, `error: Error | null`, and `setSelectedCategory: (categoryId: number | null) => void` for fetching and managing menu data.
- `frontend/src/services/menuService.ts` — SERVICE layer — provides `getAllMenuItems(): Promise<MenuItem[]>` and `getAllMenuItemCategories(): Promise<MenuItemCategory[]>` for interacting with the menu backend API.
- `frontend/src/types/menu.ts` — Generated from the backend API contract — defines TypeScript types for menu items and categories.
- `frontend/src/components/menu/MenuCategoryFilter.tsx` — COMPONENT layer — displays a list of clickable category buttons and emits the selected category ID.
- `frontend/src/components/menu/MenuItemsGrid.tsx` — COMPONENT layer — renders a responsive grid of `MenuItem` cards.

**Feature Instruction:**

## Design Tokens
- Navbar: bg-[#1A202C] text-white
- Primary CTA: bg-[#D69E2E] hover:bg-[#B78725] text-white font-semibold rounded-full px-8 py-3 transition-all duration-200
- Brand text accent: text-[#D69E2E]
- Section bg: bg-[#F7FAFC] (odd sections) / bg-white (even sections)
- Card: bg-white rounded-xl shadow-md border border-gray-100 p-6
- Section container: <section className="py-16 px-4"><div className="max-w-7xl mx-auto">
- Hero h1: text-4xl md:text-6xl font-bold text-white
- Body: text-[#2D3748] leading-relaxed

This feature provides the frontend for displaying Circuit House's digital menu, allowing customers to browse menu items by category. It consists of a main `MenuPage.tsx` that orchestrates the display, a `useMenu.ts` hook for data fetching, a `menuService.ts` for API interactions, and two presentational components: `MenuCategoryFilter.tsx` and `MenuItemsGrid.tsx`. The `menu.ts` file defines the TypeScript types for menu data.

The `MenuPage.tsx` will render the overall layout, including a hero section at the top, followed by the category filter and the grid of menu items. It will use the `useMenu` hook to fetch both menu categories and menu items from the backend. The `MenuCategoryFilter` component will display the available categories and allow users to select a category, which will then filter the items displayed in the `MenuItemsGrid`. The `MenuItemsGrid` component will be responsible for rendering the individual menu items, displaying their name, description, price, and an image.

### `menu.ts`
This file defines the `MenuItem` and `MenuItemCategory` interfaces, which are direct TypeScript representations of the `MenuItemDto` and `MenuItemCategoryDto` data shapes provided by the `menu-management-backend` feature.

### `menuService.ts`
This service acts as a client for the `menu-management-backend` API. It exports two asynchronous functions: `getAllMenuItems` and `getAllMenuItemCategories`. `getAllMenuItems` will make a GET request to `/api/v1/menus/items` to retrieve all menu items. `getAllMenuItemCategories` will make a GET request to `/api/v1/menus/categories` to retrieve all available menu categories. Both functions will return promises that resolve to arrays of the corresponding TypeScript types defined in `menu.ts`.

### `useMenu.ts`
This custom React hook leverages `react-query` to manage the fetching, caching, and state of menu data. It exports an object containing `menuItems`, `categories`, `isLoading`, `error`, and `setSelectedCategory`. Internally, it will use `menuService.getAllMenuItems()` and `menuService.getAllMenuItemCategories()` to fetch data. It will also manage a `selectedCategory` state, and when a category is selected, it will filter the `menuItems` accordingly before returning them.

### `MenuCategoryFilter.tsx`
This component receives the list of `categories` and the `setSelectedCategory` function from `useMenu.ts` as props. It will render a list of clickable category buttons. When a button is clicked, it will call `setSelectedCategory` with the ID of the selected category. The active category button should have a distinct visual style using the `Accent` color token.

### `MenuItemsGrid.tsx`
This component receives the filtered `menuItems` from `useMenu.ts` as a prop. It will render these items in a responsive grid layout. Each menu item will be displayed within a card, showing its `imageUrl`, `name`, `description`, and `price`. The card design should adhere to the `Card` design token.

### `MenuPage.tsx`
This page component will be the entry point for displaying the menu. It will use the `Layout` component from `core-frontend` to ensure consistent navigation and footer. The page will have a hero section with a background image, the restaurant name "Circuit House", and a welcoming headline like "Savor the Flavors of Circuit House". Below the hero, it will render the `MenuCategoryFilter` and `MenuItemsGrid` components, passing them the necessary data and functions from the `useMenu` hook. Loading states and error states from `useMenu` should be handled gracefully, displaying a loading spinner or an error message respectively. The overall structure will follow the `Section container` design token for content sections.

---

## Reservation Booking (Frontend)

**Name:** `reservation-booking-frontend`  
**Type:** FRONTEND  
**Change required:** true

**Files in this feature:**
- `frontend/src/pages/ReservationPage.tsx` — PAGE layer — renders the reservation booking form and displays success/error messages.
- `frontend/src/hooks/useReservations.ts` — HOOK layer — provides `useCreateReservation` for managing reservation creation state and backend interaction.
- `frontend/src/services/reservationService.ts` — SERVICE layer — handles API calls for creating reservations.
- `frontend/src/types/reservation.ts` — Generated from the backend API contract — defines TypeScript types for reservation data.
- `frontend/src/components/reservation/ReservationForm.tsx` — COMPONENT layer — provides an interactive form for users to input reservation details.

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

This feature provides a user-friendly interface for customers to book tables at Circuit House. It consists of a dedicated reservation page, a form component for inputting reservation details, a custom React hook to manage the reservation state and API interactions, a service layer for making actual API calls to the backend, and TypeScript types for data consistency.

### `ReservationPage.tsx`
This page serves as the entry point for users to make a reservation. It utilizes the `Layout` component from `core-frontend` for consistent navigation and footer. The page will display a prominent heading, a brief welcoming message, and then render the `ReservationForm` component. Upon successful submission of the form, a success message will be displayed to the user.

### `ReservationForm.tsx`
This component is responsible for collecting all necessary reservation details from the user. It will include input fields for `customerName`, `customerEmail`, `customerPhone`, `reservationTime` (date and time pickers), and `numberOfGuests`. It will use the `CreateReservationRequest` type for form data validation and submission. The form will handle its own local state for input fields and will call the `createReservation` function from the `useReservations` hook upon submission. The form will display validation errors and a loading state during submission.

### `useReservations.ts`
This custom React hook encapsulates the logic for interacting with the reservation backend. It uses `react-query` to manage the state of reservation creation. It exports a `useCreateReservation` function that provides a `mutate` function to create a reservation and exposes `isLoading`, `isSuccess`, and `isError` states. The `mutate` function will call `reservationService.createReservation(request: CreateReservationRequest)`.

### `reservationService.ts`
This service acts as an intermediary between the `useReservations` hook and the backend API. It exports an asynchronous function `createReservation(request: CreateReservationRequest): Promise<ReservationDto>` which makes a POST request to the `/api/v1/reservations` endpoint of the `reservation-system-backend`. It uses the `client` from `frontend/src/api/client.ts` for making HTTP requests.

### `reservation.ts`
This file defines the TypeScript interfaces for reservation-related data transfer objects (DTOs) and request/response structures, ensuring type safety across the frontend application. It will define `CreateReservationRequest` and `ReservationDto` based on the `reservation-system-backend`'s API contract.

---

## Order & Checkout (Frontend)

**Name:** `order-checkout-frontend`  
**Type:** FRONTEND  
**Change required:** true

**Files in this feature:**
- `frontend/src/pages/OrderPage.tsx` — PAGE layer — orchestrates the multi-step checkout process, consuming cart state, delivery address input, and payment component, then creating an order via `useCreateOrder`.
- `frontend/src/pages/OrderConfirmationPage.tsx` — PAGE layer — displays the details of a successfully placed order by fetching order data using `useGetOrderById(orderId: string)`.
- `frontend/src/pages/OrderStatusPage.tsx` — PAGE layer — allows users to query the status of an order by its ID, using `useGetOrderById(orderId: string)`.
- `frontend/src/hooks/useOrders.ts` — HOOK layer — provides React Query hooks for `useCreateOrder` to create new orders and `useGetOrderById` to fetch order details.
- `frontend/src/services/orderService.ts` — SERVICE layer — handles API communication for order-related operations, exposing `createOrder(request: CreateOrderRequest)` and `getOrderById(orderId: string)`.
- `frontend/src/types/order.ts` — Generated from the backend API contract — defines TypeScript interfaces for order-related data transfer objects and entities.
- `frontend/src/context/CartContext.tsx` — CONTEXT layer — provides `CartContext` with methods `addItemToCart`, `removeItemFromCart`, `updateItemQuantity`, `clearCart`, and exposes `cartItems` and `cartTotal`.
- `frontend/src/services/local/cartService.ts` — SERVICE layer — handles client-side persistence of the shopping cart to `localStorage`, exposing `getCartItems`, `saveCartItems`, and `clearCartItems`.
- `frontend/src/components/order/OrderSummary.tsx` — COMPONENT layer — displays a summary of items in the cart, their quantities, and the total price, consuming `cartItems` and `cartTotal` from `CartContext`.
- `frontend/src/components/order/DeliveryAddressForm.tsx` — COMPONENT layer — provides a form for users to input their delivery address and contact information, emitting `DeliveryAddress` and contact details on submission.
- `frontend/src/components/order/PaymentComponent.tsx` — COMPONENT layer — simulates a payment gateway integration, providing a 'Proceed to Payment' button that triggers a callback on click.

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

This feature provides the frontend user interface and logic for managing the shopping cart, proceeding through a multi-step checkout process, and viewing order status. It integrates with the `order-api-backend` for creating and retrieving orders, and uses `localStorage` for cart persistence.

The `CartContext.tsx` file provides a React Context for managing the shopping cart state globally. It exposes `cartItems`, `addItemToCart`, `removeItemFromCart`, `updateItemQuantity`, `clearCart`, and `cartTotal`. This context is consumed by `OrderPage.tsx` and `OrderSummary.tsx`. The actual persistence to `localStorage` is handled by `cartService.ts`.

`order.ts` defines the TypeScript interfaces for `MenuItem`, `OrderItem`, `CreateOrderRequest`, `OrderResponseDto`, `CreateOrderItemRequest`, `DeliveryAddress`, and `OrderStatus` which mirror the backend DTOs from `order-core-backend` and `menu-management-backend`. These types are used throughout the feature to ensure type safety and consistency.

`orderService.ts` is responsible for making API calls to the `order-api-backend`. It exports asynchronous functions `createOrder(request: CreateOrderRequest): Promise<OrderResponseDto>` and `getOrderById(orderId: string): Promise<OrderResponseDto>`. These functions utilize the `api/client.ts` for HTTP requests.

`useOrders.ts` is a custom React Query hook that wraps `orderService.ts`. It provides `useCreateOrder` for creating new orders and `useGetOrderById` for fetching order details. `useCreateOrder` returns a `mutate` function, `isLoading`, `isSuccess`, `isError`, and `error` for handling the order creation lifecycle. `useGetOrderById` returns `order`, `isLoading`, `isError`, and `error` for fetching order details. These hooks are consumed by `OrderPage.tsx`, `OrderConfirmationPage.tsx`, and `OrderStatusPage.tsx`.

`OrderPage.tsx` renders the multi-step checkout flow. It uses `CartContext` to display the order summary via `OrderSummary.tsx`. It collects delivery address information using `DeliveryAddressForm.tsx` and integrates with `PaymentComponent.tsx` for the final payment step. Upon successful payment, it calls `useCreateOrder` from `useOrders.ts` with the collected order details and navigates to the `OrderConfirmationPage.tsx`.

`OrderSummary.tsx` is a presentational component that receives `cartItems` and `cartTotal` from `CartContext` and displays them in a clear, concise manner, reflecting the elegant and modern visual style. It allows users to review their selected items and quantities before proceeding with the order.

`DeliveryAddressForm.tsx` is a form component that captures the customer's `customerName`, `customerEmail`, `customerPhone`, and `deliveryAddress`. It validates the input fields and passes the collected data to `OrderPage.tsx`.

`PaymentComponent.tsx` simulates a payment gateway integration. In a real-world scenario, this component would interact with a payment SDK. For this feature, it will simply provide a button to 'Proceed to Payment' which, when clicked, will trigger the `createOrder` mutation in `OrderPage.tsx`.

`OrderConfirmationPage.tsx` displays a summary of the successfully placed order. It retrieves the `orderId` from the URL parameters and uses `useGetOrderById` from `useOrders.ts` to fetch and display the order details, including `orderItems`, `totalAmount`, `deliveryAddress`, and `status`.

`OrderStatusPage.tsx` allows users to look up the status of their order. It provides an input field for the `orderId` and uses `useGetOrderById` from `useOrders.ts` to fetch and display the order status and details. It will show a loading state while fetching and an error message if the order is not found or an error occurs.

---

## Events Display (Frontend)

**Name:** `events-display-frontend`  
**Type:** FRONTEND  
**Change required:** true

**Files in this feature:**
- `frontend/src/pages/EventsPage.tsx` — PAGE layer — displays a list of upcoming events by consuming the `useEvents` hook and rendering `EventCard` components.
- `frontend/src/hooks/useEvents.ts` — HOOK layer — provides a custom React Query hook `useEvents()` to fetch and manage event data from the backend.
- `frontend/src/services/eventService.ts` — SERVICE layer — implements `getAllEvents(): Promise<Event[]>` to make API calls to the event-management-backend.
- `frontend/src/types/event.ts` — Generated from the backend API contract — defines the TypeScript interface for Event data.
- `frontend/src/components/events/EventCard.tsx` — COMPONENT layer — displays the details of a single event in a card format.

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

This feature provides a frontend interface for displaying upcoming events at Circuit House. It consists of a main page (`EventsPage.tsx`), a custom React hook (`useEvents.ts`) for data fetching, a service layer (`eventService.ts`) to interact with the backend API, a type definition file (`event.ts`), and a reusable component (`EventCard.tsx`) for individual event display.

`event.ts` defines the `Event` interface, which mirrors the `EventDto` from the `event-management-backend` feature. This ensures type safety throughout the frontend application when handling event data.

`eventService.ts` is responsible for making HTTP requests to the `event-management-backend`'s public API. It exposes an `getAllEvents` function that calls the `GET /api/v1/events` endpoint to retrieve a list of all active events. This service uses the `apiClient` from `@/api/client.ts` for its network requests.

`useEvents.ts` is a custom React Query hook that consumes `eventService.ts`. It provides a convenient way for components to fetch and manage event data, handling loading states, errors, and caching. The `useEvents` hook exports `events`, `isLoading`, and `error` states, which are then used by `EventsPage.tsx`.

`EventCard.tsx` is a presentational component that receives an `Event` object as a prop. It renders the event's name, description, date, and image in an elegant card format, adhering to the specified design tokens. The event date should be formatted for readability.

`EventsPage.tsx` is the main page for displaying events. It utilizes the `Layout` component from `core-frontend` for consistent navigation and footer. It consumes the `useEvents` hook to fetch event data. While events are loading, it displays a loading indicator. If an error occurs, it shows an error message. Once events are loaded, it iterates through the `events` array and renders an `EventCard` for each event. The page content should be structured within a section container, with a prominent heading like "Upcoming Events at Circuit House" and a sub-heading like "Experience unforgettable moments with our special live music nights and culinary events.". The events should be displayed in a responsive grid.

---

## Testimonials Display (Frontend)

**Name:** `testimonials-display-frontend`  
**Type:** FRONTEND  
**Change required:** true

**Files in this feature:**
- `frontend/src/hooks/useTestimonials.ts` — Custom React hook for fetching and managing testimonial data using React Query, exposing `useTestimonials(): { testimonials: Testimonial[] | undefined, isLoading: boolean, error: Error | null }`.
- `frontend/src/services/testimonialService.ts` — SERVICE layer — implements `getAllTestimonials(): Promise<Testimonial[]>` for fetching testimonials from the backend.
- `frontend/src/types/testimonial.ts` — Generated from the backend API contract — defines the TypeScript interface for testimonial data.

**Feature Instruction:**

This feature provides the frontend logic for fetching and displaying customer testimonials for Circuit House restaurant. It consists of a TypeScript type definition for testimonials, a service for making API calls to the backend, and a custom React hook for managing testimonial data with React Query.

## Design Tokens
- Navbar: bg-[#1A202C] text-white
- Primary CTA: bg-[#D69E2E] hover:bg-[#B78825] text-white font-semibold rounded-full px-8 py-3 transition-all duration-200
- Brand text accent: text-[#D69E2E]
- Section bg: bg-[#F7FAFC] (odd sections) / bg-white (even sections)
- Card: bg-white rounded-xl shadow-md border border-gray-100 p-6
- Section container: <section className="py-16 px-4"><div className="max-w-7xl mx-auto">
- Hero h1: text-4xl md:text-6xl font-bold text-white
- Body: text-[#2D3748] leading-relaxed

### `frontend/src/types/testimonial.ts`
This file defines the `Testimonial` interface, which mirrors the `TestimonialDto` structure from the `testimonial-management-backend` feature. It includes fields for `id`, `author`, `content`, `rating`, `date`, and `approved`.

### `frontend/src/services/testimonialService.ts`
This service provides an asynchronous function `getAllTestimonials` that makes a GET request to the `/api/v1/testimonials` endpoint of the `testimonial-management-backend`. It uses the `apiClient` from `@/api/client.ts` to perform the HTTP call and expects a `Promise<Testimonial[]>` as a response. This function will be called by the `useTestimonials` hook.

### `frontend/src/hooks/useTestimonials.ts`
This custom React Query hook, `useTestimonials`, is responsible for fetching and managing the testimonial data. It uses `react-query`'s `useQuery` hook to call `testimonialService.getAllTestimonials()`. The hook exposes `testimonials`, `isLoading`, and `error` states, allowing components to easily consume testimonial data and handle loading/error states. Components like `TestimonialsCarousel.tsx` (from `static-pages-frontend`) will consume this hook to display testimonials.

---

## Admin Portal (Frontend)

**Name:** `admin-portal-frontend`  
**Type:** FRONTEND  
**Change required:** true

**Files in this feature:**
- `frontend/src/components/admin/AdminLayout.tsx` — COMPONENT layer — provides the overarching layout for all admin pages, including a sidebar for navigation and authentication protection.
- `frontend/src/pages/admin/AdminDashboardPage.tsx` — PAGE layer — the main landing page for the admin portal, displaying a welcome message and quick links.
- `frontend/src/pages/admin/AdminMenuPage.tsx` — PAGE layer — orchestrates menu item management, integrating a table, creation/edit forms, and deletion dialogs.
- `frontend/src/components/admin/menu/MenuTable.tsx` — COMPONENT layer — displays a data table of menu items with edit and delete actions.
- `frontend/src/components/admin/menu/MenuItemForm.tsx` — COMPONENT layer — provides a form for creating or editing menu items.
- `frontend/src/components/admin/menu/DeleteMenuItemDialog.tsx` — COMPONENT layer — a confirmation dialog for deleting a menu item.
- `frontend/src/pages/admin/AdminReservationsPage.tsx` — PAGE layer — orchestrates reservation management, integrating a table and status update forms.
- `frontend/src/components/admin/reservations/ReservationsTable.tsx` — COMPONENT layer — displays a data table of reservations with status update and delete actions.
- `frontend/src/components/admin/reservations/UpdateReservationStatusForm.tsx` — COMPONENT layer — provides a form to update the status of a reservation.
- `frontend/src/pages/admin/AdminOrdersPage.tsx` — PAGE layer — orchestrates online order management, integrating a table and order detail modals.
- `frontend/src/components/admin/orders/OrdersTable.tsx` — COMPONENT layer — displays a data table of online orders with detail viewing and status update actions.
- `frontend/src/components/admin/orders/OrderDetailModal.tsx` — COMPONENT layer — a modal dialog showing full order details and allowing status updates.
- `frontend/src/pages/admin/AdminEventsPage.tsx` — PAGE layer — orchestrates event management, integrating a table and creation/edit forms.
- `frontend/src/components/admin/events/EventsTable.tsx` — COMPONENT layer — displays a data table of events with edit and delete actions.
- `frontend/src/components/admin/events/EventForm.tsx` — COMPONENT layer — provides a form for creating or editing events.
- `frontend/src/pages/admin/AdminTestimonialsPage.tsx` — PAGE layer — orchestrates testimonial management, integrating a table and creation/edit forms.
- `frontend/src/components/admin/testimonials/TestimonialsTable.tsx` — COMPONENT layer — displays a data table of testimonials with edit and delete actions.
- `frontend/src/components/admin/testimonials/TestimonialForm.tsx` — COMPONENT layer — provides a form for creating or editing testimonials.

**Feature Instruction:**

The Admin Portal (Frontend) feature provides a comprehensive web interface for managing various aspects of the Circuit House restaurant's operations, including menu items, reservations, online orders, events, and customer testimonials. This feature is built using React and TypeScript, leveraging `react-router-dom` for navigation and Tailwind CSS for styling, adhering to the elegant and modern visual direction with a sophisticated and warm color palette.

## Design Tokens
- Navbar: bg-[#1A202C] text-white
- Sidebar: bg-[#1A202C] text-white
- Primary CTA: bg-[#D69E2E] hover:bg-[#B78B27] text-white font-semibold rounded-md px-4 py-2 transition-all duration-200
- Secondary CTA: bg-gray-200 hover:bg-gray-300 text-[#2D3748] font-semibold rounded-md px-4 py-2 transition-all duration-200
- Brand text accent: text-[#D69E2E]
- Section bg: bg-[#F7FAFC]
- Card: bg-white rounded-lg shadow-sm border border-gray-100 p-6
- Section container: <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
- Heading 1: text-3xl font-bold text-[#1A202C]
- Body: text-[#2D3748] leading-relaxed
- Table Header: bg-gray-50 text-xs font-medium text-gray-500 uppercase tracking-wider
- Table Row: bg-white border-b border-gray-200 hover:bg-gray-50
- Form Label: block text-sm font-medium text-gray-700
- Form Input: mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#D69E2E] focus:ring-[#D69E2E] sm:text-sm

### AdminLayout.tsx
This component provides the overall layout for all admin pages. It includes a fixed sidebar for navigation and a main content area. The sidebar contains links to 'Dashboard', 'Menu Management', 'Reservations', 'Orders', 'Events', and 'Testimonials'. It uses the `useAuth` hook from the `auth-frontend` feature to check if the user is authenticated and redirects to the login page if not. The layout ensures a consistent look and feel across the admin portal.

### AdminDashboardPage.tsx
This page serves as the landing page for the admin portal. It will display a welcoming message and potentially summary statistics or quick links to other management sections. It uses the `AdminLayout` component for its structure.

### AdminMenuPage.tsx
This page is responsible for managing menu items. It orchestrates the `MenuTable`, `MenuItemForm`, and `DeleteMenuItemDialog` components. It utilizes the `useMenu` hook from `menu-display-frontend` to fetch and manage menu data. The page will display a table of menu items, allow administrators to open a form to create new menu items or edit existing ones, and confirm deletions through a dialog. All interactions with the backend for menu management (create, update, delete) are handled via the `useMenu` hook, which in turn calls the `menu-management-backend` API endpoints.

### MenuTable.tsx
This component displays a paginated and sortable table of `MenuItemDto` objects. It receives `menuItems`, `onEdit`, and `onDelete` as props. Each row will have action buttons for 'Edit' and 'Delete'. It should display `id`, `name`, `description`, `price`, `imageUrl`, and `categoryId` for each menu item.

### MenuItemForm.tsx
This component provides a form for creating or editing a `MenuItemDto`. It receives `initialData` (for editing), `onSubmit`, and `onCancel` as props. The form fields include `name`, `description`, `price`, `imageUrl`, and `categoryId`. It should include validation for required fields and appropriate data types.

### DeleteMenuItemDialog.tsx
This component is a confirmation dialog for deleting a menu item. It receives `isOpen`, `onClose`, `onConfirm`, and `itemName` as props. When `onConfirm` is called, it triggers the deletion of the specified menu item.

### AdminReservationsPage.tsx
This page manages restaurant reservations. It integrates `ReservationsTable` and `UpdateReservationStatusForm`. It uses the `useReservations` hook (to be defined in this feature) to fetch and manage reservation data. The page will display a table of reservations, allow filtering by status, and provide a mechanism to update the status of a selected reservation using `UpdateReservationStatusForm`. All interactions with the backend for reservation management (get all, update status) are handled via the `useReservations` hook, which in turn calls the `reservation-system-backend` API endpoints.

### ReservationsTable.tsx
This component displays a paginated and sortable table of `ReservationDto` objects. It receives `reservations`, `onUpdateStatus`, and `onDelete` as props. Each row will display `id`, `customerName`, `customerEmail`, `customerPhone`, `reservationTime`, `numberOfGuests`, `status`, and `notes`. It will include action buttons for 'Update Status' and 'Delete'.

### UpdateReservationStatusForm.tsx
This component provides a form to update the status of a `ReservationDto`. It receives `reservationId`, `initialStatus`, `initialNotes`, `onSubmit`, and `onCancel` as props. The form will have a dropdown for `status` (PENDING, CONFIRMED, CANCELLED, COMPLETED, NO_SHOW) and a textarea for `notes`.

### AdminOrdersPage.tsx
This page manages online orders. It integrates `OrdersTable` and `OrderDetailModal`. It uses the `useOrders` hook (to be defined in this feature) to fetch and manage order data. The page will display a table of orders, allow filtering by status, and provide a modal to view full order details and update the order status. All interactions with the backend for order management (get all, update status) are handled via the `useOrders` hook, which in turn calls the `order-api-backend` API endpoints.

### OrdersTable.tsx
This component displays a paginated and sortable table of `OrderResponseDto` objects. It receives `orders`, `onViewDetails`, and `onUpdateStatus` as props. Each row will display `id`, `customerName`, `orderTime`, `totalAmount`, and `status`. It will include action buttons for 'View Details' and 'Update Status'.

### OrderDetailModal.tsx
This component is a modal dialog that displays the full details of an `OrderResponseDto`. It receives `isOpen`, `onClose`, `order`, and `onUpdateStatus` as props. It will show all fields of the order, including `orderItems`, and provide a form to update the order's `status`.

### AdminEventsPage.tsx
This page is responsible for managing events. It orchestrates the `EventsTable` and `EventForm` components. It utilizes the `useEvents` hook (to be defined in this feature) to fetch and manage event data. The page will display a table of events, allow administrators to open a form to create new events or edit existing ones, and confirm deletions. All interactions with the backend for event management (create, update, delete) are handled via the `useEvents` hook, which in turn calls the `event-management-backend` API endpoints.

### EventsTable.tsx
This component displays a paginated and sortable table of `EventDto` objects. It receives `events`, `onEdit`, and `onDelete` as props. Each row will have action buttons for 'Edit' and 'Delete'. It should display `id`, `name`, `description`, `eventDate`, `imageUrl`, and `active` for each event.

### EventForm.tsx
This component provides a form for creating or editing an `EventDto`. It receives `initialData` (for editing), `onSubmit`, and `onCancel` as props. The form fields include `name`, `description`, `eventDate`, `imageUrl`, and `active`. It should include validation for required fields and appropriate data types.

### AdminTestimonialsPage.tsx
This page is responsible for managing testimonials. It orchestrates the `TestimonialsTable` and `TestimonialForm` components. It utilizes the `useTestimonials` hook (to be defined in this feature) to fetch and manage testimonial data. The page will display a table of testimonials, allow administrators to open a form to create new testimonials or edit existing ones, and confirm deletions. All interactions with the backend for testimonial management (create, update, delete) are handled via the `useTestimonials` hook, which in turn calls the `testimonial-management-backend` API endpoints.

### TestimonialsTable.tsx
This component displays a paginated and sortable table of `TestimonialDto` objects. It receives `testimonials`, `onEdit`, and `onDelete` as props. Each row will have action buttons for 'Edit' and 'Delete'. It should display `id`, `author`, `content`, `rating`, `date`, and `approved` for each testimonial.

### TestimonialForm.tsx
This component provides a form for creating or editing a `TestimonialDto`. It receives `initialData` (for editing), `onSubmit`, and `onCancel` as props. The form fields include `author`, `content`, `rating`, `date`, and `approved`. It should include validation for required fields and appropriate data types.

---

## Infrastructure

**Name:** `infrastructure`  
**Type:** INFRA  
**Change required:** true

**Feature Instruction:**

_Not enriched (INFRA or skipped)._

---

