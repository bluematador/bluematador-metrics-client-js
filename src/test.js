const bluematador = require('./options').init({prefix: "app"});

bluematador.count('testcount1');

bluematador.count('testcount2', {value: 3});

bluematador.count('testcount3', {value: 2, sampleRate: 1});

bluematador.count('testcount4', {labels: ["env:Prod", "account_id: 1234324"]});

bluematador.count('testcount5', {sampleRate: 1, labels: ["env:Prod", "account_id: 1234324"]});

bluematador.gauge('testGauge1', 23.2323);

bluematador.gauge('testGauge2', 23, {sampleRate: 1, labels: ["env:Prod", "account_id: 1234324"]});

bluematador.gauge('testGauge3', 23, {labels: ["env:Prod", "account_id: 1234324"]});

// bluematador.gauge('testGauge4', 23, 1, { environment: 'Prod', account_id: 1232151 });
