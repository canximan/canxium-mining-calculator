$(document).ready(function() {
    const stats = new WebSocket("wss://stats.canxium.org/primus");
    let secondADay = 24 * 60 * 60;
    let networkHashrate = 0;
    let cauPerDay = 0;
    let blocktime = 0;
    let hashRequired = 0;
    stats.onmessage = (event) => {
      let data = JSON.parse(event.data)
      if (data.action == "charts") {
        console.log(data.data.avgHashrate)
        $("#network_hashrate").val((data.data.avgHashrate/1000000000).toFixed(2) + " GH/s")
        $("#blocktime").val(data.data.avgBlocktime.toFixed(2) + " s")
        networkHashrate = data.data.avgHashrate;
        blocktime = data.data.avgBlocktime;
        cauPerDay = 0.1875 * secondADay / blocktime;
        hashRequired = networkHashrate * secondADay / cauPerDay;
        $("#cauPerDay").text(cauPerDay.toFixed(2));
        $("#hashRequired").text((hashRequired / 1000000000).toFixed(2) + " GH/CAU");

        let minerHashrate = parseFloat($("#hashrate").val());
        let consumption = parseFloat($("#consumption").val());
        let electricity = parseFloat($("#electricity").val());
        if (minerHashrate != 0) {
          let timeToMine = hashRequired / (minerHashrate * 1000000 * secondADay);
          let cost = timeToMine * 24 * consumption * electricity / 1000;
          $("#timeToMine").text((timeToMine).toFixed(6) + " Day");
          $("#cost").text((cost).toFixed(2) + " USD/CAU");
          $("#totalCost").text("" + (cost/0.5).toFixed(2) + " ~ " + (cost/0.2).toFixed(2) + " USD/CAU");
        }
      }

      $("#hashrate").change(function(){
        calc();
      });

      $("#consumption").change(function(){
        calc();
      });

      $("#electricity").change(function(){
        calc();
      });

      function calc() {
        let minerHashrate = parseFloat($("#hashrate").val());
        let consumption = parseFloat($("#consumption").val());
        let electricity = parseFloat($("#electricity").val());
        if (minerHashrate != 0) {
          let timeToMine = hashRequired / (minerHashrate * 1000000 * secondADay);
          let cost = timeToMine * 24 * consumption * electricity / 1000;
          $("#timeToMine").text((timeToMine).toFixed(6) + " Day");
          $("#cost").text((cost).toFixed(2) + " USD/CAU");
          $("#totalCost").text("" + (cost/0.5).toFixed(2) + " ~ " + (cost/0.2).toFixed(2) + " USD/CAU");
        }
      }
    };
});