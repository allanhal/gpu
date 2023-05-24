// setInterval(frame, 1000);
// function frame() {
//   if (window.filterGCLobby) {
//     Array.from(document.getElementsByClassName('lobby-btn-big')).forEach((element) => {
//       if (element.innerText !== 'ENTRAR') {
//         var closest = element.closest('.sala-card-wrapper');
//         if (closest && closest instanceof HTMLElement) {
//           closest.style.display = 'none';
//         }
//       }
//     });
//   }
// }

setTimeout(function () {
  console.log('content.js');

  //gets table
  var oTable = document.getElementById('PrecosGPU');
  console.log('oTable', oTable);
  oTable.onchange = () => {
    console.log('changed');
  };

  //gets rows of table
  var rowLength = oTable.rows.length;
  console.log('rowLength', rowLength);

  let sdfg = document.getElementById('PrecosGPU');
  let data = [...sdfg.rows].map((t) => [...t.children].map((u) => u.innerText));
  console.log(data);
}, 2000);
