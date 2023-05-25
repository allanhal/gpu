setTimeout(async function () {
  let table = document.getElementById('PrecosGPU');
  if (!table) {
    return;
  }
  var row = table.rows[0];
  var performanceCell = row.insertCell(4);
  var costEffectiveCell = row.insertCell(5);
  performanceCell.innerHTML = '<b>Benchmark</b>';
  costEffectiveCell.innerHTML = '<b>Benchmark/Price</b>';

  const gpuNames = new Set();
  for (let rowNumber = 2; rowNumber < table?.rows?.length; rowNumber++) {
    const text = table.rows[rowNumber].cells[0].innerHTML;
    const gpuName = text.split('<b>')[1].split('</b>')[0].trim();
    gpuNames.add(gpuName);
  }
  const uniqueGpus = Array.from(gpuNames);

  const jsonData = await fetch('https://gpu-benchmark.onrender.com/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      keys: uniqueGpus,
    }),
  }).then((response) => response.json());
  console.log('jsonData', jsonData);
  const result = jsonData.map((gpu) => ({
    [gpu.key]: gpu.result.value,
  }));
  console.log('result', result);
  let resultJson = {};
  jsonData.forEach((gpu) => {
    resultJson = {
      ...resultJson,
      [gpu.key]: gpu.result.value,
    };
  });

  for (let rowNumber = 2; rowNumber < table?.rows?.length; rowNumber++) {
    const benchMark = 1000;
    const text = table.rows[rowNumber].cells[0].innerHTML;
    const gpuName = text.split('<b>')[1].split('</b>')[0].trim();

    const price = table.rows[rowNumber].cells[1].innerHTML.split('&nbsp;')[1].split('.').join('').split(',').join('.');
    const perfCell = table.rows[rowNumber].insertCell(4);
    const ceCell = table.rows[rowNumber].insertCell(5);
    perfCell.innerHTML = resultJson[gpuName];
    // perfCell.innerHTML = 'Price: ' + price + ' / Bench: ' + resultJson[gpuName];
    ceCell.innerHTML = Number((benchMark / price) * 100).toFixed(2);
  }
}, 1000);
