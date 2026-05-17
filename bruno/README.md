# MyStreet Bruno API Suite

This Bruno collection tests the `GET /api/road/[id]` endpoint with:

- successful fetch (`200`)
- missing road (`404`)
- invalid road id (`400`)
- unsupported method (`405`)

## Run

1. Start app locally:
   `npm run dev`
2. Open Bruno and load the `bruno/` folder as a collection.
3. Select environment `local`.
4. Run the `01-Road API` folder.

## Environment Variables

- `baseUrl`: API base URL
- `roadSystemId`: known seeded road id
- `missingRoadSystemId`: non-existing road id for negative test
- `invalidRoadId`: encoded invalid id (`%20`) for validation test
