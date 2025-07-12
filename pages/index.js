import fs from 'fs';
import path from 'path';
const { parse } = require('csv-parse/sync');

export async function getStaticProps() {
  const filePath = path.join(process.cwd(), 'public', 'data.csv');
  const csvData = fs.readFileSync(filePath, 'utf-8');
  const records = parse(csvData, { columns: false });

  return {
    props: {
      table: records,
    },
  };
}

export default function Home({ table }) {
  const [header, ...rows] = table;

  return (
    <main style={{ padding: '2rem', fontFamily: 'sans-serif' }}>
      <h1>Tabella da CSV</h1>
      <table border="1" cellPadding="8" style={{ borderCollapse: 'collapse', width: '100%' }}>
        <thead>
          <tr>
            {header.map((col, i) => (
              <th key={i}>{col}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr key={i}>
              {row.map((cell, j) => (
                <td key={j}>{cell}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </main>
  );
}
