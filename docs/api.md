# API Notes

Interactive OpenAPI documentation is available at `/docs` on the API service and `/api/docs` through the web service.

## Create an expense

`POST /expenses`

```json
{
  "payerId": "alice",
  "beneficiaryId": "bob",
  "amount": 50,
  "description": "Dinner"
}
```

The beneficiary owes the payer. The API rejects identical users, unknown users, empty descriptions, non-positive values, more than two decimal places, and values above 1,000,000.

## Clear expenses

`DELETE /expenses`

Deletes every expense and returns the number of deleted records. Seeded users are preserved.

## Balance response

`GET /balances`

The response contains simplified final payments after netting every user's position across the group. Reciprocal debts and closed loops are removed.

```json
[
  {
    "debtor": { "id": "bob", "name": "Bob", "initials": "BO", "color": "#5E8BFF" },
    "creditor": { "id": "alice", "name": "Alice", "initials": "AL", "color": "#FF7A64" },
    "amount": 50
  }
]
```

All API amounts use regular currency units. Conversion to and from integer cents happens at the persistence boundary.
