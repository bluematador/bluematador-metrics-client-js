const bluematador = require("./index").init()


bluematador.counter('testCounter1');

bluematador.counter('testCounter2', 2);

bluematador.counter('testCounter3', 2, 1);

bluematador.counter('testCounter4', { environment: 'Prod', account_id: 1232151 });

bluematador.counter('testCounter5', 2, { environment: 'Prod', account_id: 1232151 });


bluematador.gauge('testGauge1', 23.2323);

bluematador.gauge('testGauge2', 23, 1);

bluematador.gauge('testGauge3', 23, { environment: 'Prod', account_id: 1232151 });

bluematador.gauge('testGauge4', 23, 1, { environment: 'Prod', account_id: 1232151 });
