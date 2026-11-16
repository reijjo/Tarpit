## SQLx Query Cheat Sheet

### 1. Query functions — Which one should I use?

| Function                       | What it does                                                                                    | When to use it                                                           |
| ------------------------------ | ----------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------ |
| `sqlx::query()`                | Executes SQL and returns database rows without automatically mapping them into a custom struct. | `INSERT`, `UPDATE`, `DELETE`, or queries where you handle rows manually. |
| `sqlx::query_as::<_, T>()`     | Converts database rows directly into Rust structs or tuples using `FromRow`.                    | Fetching users, bets, categories, etc.                                   |
| `sqlx::query_scalar::<_, T>()` | Returns only the first column of each row as a Rust value.                                      | Fetching an ID, `COUNT(*)`, `EXISTS`, etc.                               |
| `sqlx::query!()`               | Compile-time checked SQL query that generates a result type.                                    | When you want SQL and column types checked during compilation.           |
| `sqlx::query_as!()`            | Compile-time checked SQL query that maps results into an existing struct.                       | Similar to `query_as`, but with compile-time database checking.          |
| `sqlx::query_scalar!()`        | Compile-time checked query returning the first column.                                          | Similar to `query_scalar`, with compile-time checking.                   |
| `sqlx::raw_sql()`              | Executes raw SQL, including multiple statements.                                                | Database setup, DDL and administrative scripts.                          |

**Note:** The `!` macros normally require access to the database schema during compilation or previously prepared SQLx offline metadata.

### 2. Execution methods — How many results do I want?

| Method                | Returns         | When to use it                                                                          |
| --------------------- | --------------- | --------------------------------------------------------------------------------------- |
| `.execute(db)`        | `PgQueryResult` | When you don't need returned rows. Typical for `INSERT`, `UPDATE`, `DELETE`.            |
| `.fetch_one(db)`      | `T`             | When exactly one row is expected. Returns an error if none exists.                      |
| `.fetch_optional(db)` | `Option<T>`     | When a row might not exist. Returns `None` instead of a row-not-found error.            |
| `.fetch_all(db)`      | `Vec<T>`        | When you want all matching rows. Returns an empty vector if none exist.                 |
| `.fetch(db)`          | Stream of rows  | When you want to process rows one at a time rather than collect everything immediately. |

### 3. Other useful methods

| Method             | Purpose                                                                                 |
| ------------------ | --------------------------------------------------------------------------------------- |
| `.bind(value)`     | Safely passes a Rust value into SQL placeholders such as `$1`, `$2`.                    |
| `.rows_affected()` | Returns how many rows an `INSERT`, `UPDATE`, or `DELETE` affected, from a query result. |
| `.await`           | Waits for the asynchronous database operation to finish.                                |

### 4. Common examples

| Task                     | SQLx approach                                                   |
| ------------------------ | --------------------------------------------------------------- |
| Get all user's bets      | `query_as::<_, Bet>(...).bind(user_id).fetch_all(db).await`     |
| Find a user by email     | `query_as::<_, User>(...).bind(email).fetch_optional(db).await` |
| Get a specific bet by ID | `query_as::<_, Bet>(...).bind(id).fetch_one(db).await`          |
| Get an ID                | `query_scalar::<_, i64>(...).fetch_one(db).await`               |
| Count bets               | `query_scalar::<_, i64>(...).fetch_one(db).await`               |
| Insert a category        | `query(...).bind(name).execute(db).await`                       |
| Delete a bet             | `query(...).bind(id).execute(db).await`                         |

### Quick rule

- **Need a struct?** Use `query_as`.
- **Need one value?** Use `query_scalar`.
- **Need to execute SQL without returning rows?** Use `query` + `execute`.
- **Expect one result?** Use `fetch_one` or `fetch_optional`.
- **Expect multiple results?** Use `fetch_all`.

All the examples without `!` use runtime SQL queries. `query_as` needs the result type to implement `FromRow`.
