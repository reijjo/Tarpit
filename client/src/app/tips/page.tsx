export default function Tips() {
  return (
    <main className={`wrapper`}>
      <h1>Pick of the day</h1>
      <div>
        <p>picks amount</p>
        <p>total Profit/loss units</p>
        <table>
          <thead>
            <tr>
              <th>Pick</th>
              <th>Game</th>
              <th>Result</th>
              <th>profit/loss units</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>example</td>
              <td>team1 - team2</td>
              <td>example</td>
              <td>+0.95u</td>
            </tr>
          </tbody>
        </table>
      </div>
    </main>
  );
}
