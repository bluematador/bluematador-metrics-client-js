const bluematador = require("./index").init("localhost", 8767, "app#")


bluematador.count('testcount1');

bluematador.count('testcount2', 2)

bluematador.count('testcount3', 2, 1);

bluematador.count('testcount4', { environment: '#Prod', account_id: 1232151 });

bluematador.count('testcount5', 2, { environment: 'Prod', account_id: 1232151 });


bluematador.gauge('testGauge1', 23.2323);

bluematador.gauge('testGauge2', 23, 1);

bluematador.gauge('testGauge3', 23, { environment: 'Prod|', account_id: 1232151 });

bluematador.gauge('testGauge4', 23, 1, { environment: 'Prod', account_id: 1232151 });
