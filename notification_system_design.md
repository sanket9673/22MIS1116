# Stage 1

## Priority Logic

Priority is determined using:

- Placement = Highest
- Result = Medium
- Event = Lowest

If priorities are equal,
latest notification is preferred.

## Efficient Maintenance Strategy

To efficiently maintain the top 10 notifications:

- Use a Min Heap / Priority Queue
- Maintain fixed size = 10
- Incoming notifications compared dynamically
- Lower priority notifications removed automatically

Time Complexity:
O(log n)

## Logging Strategy

Custom reusable middleware is used.

Logs added for:

- API lifecycle
- Priority calculation
- State updates
- Page lifecycle
- Error handling

## Scalability

System supports:
- pagination
- filtering
- real-time notification updates
- responsive UI