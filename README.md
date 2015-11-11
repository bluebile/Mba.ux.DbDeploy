# Plugin para execução de scripts e arquivos delta para atualização de banco


## Utilização
### Example 1
```js
var deploy = Ext.create('Mba.ux.DbDeploy');
var model = Ext.create('Model');

deploy.setDb(model.getProxy().getDatabaseObject());
deploy.setDeltas(
    [
        [
            'ALTER TABLE teste ADD column1 varchar(255)',
            'ALTER TABLE teste ADD column2 varchar(255)'
        ],
        [
            'ALTER TABLE teste ADD column3 varchar(255)'
        ]
    ]
);
deploy.run();
```
### Example 2
```js
var model = Ext.create('Model');
var deploy = Ext.create('Mba.ux.DbDeployFile');

deploy.setDb(model.getProxy().getDatabaseObject());
deploy.setDeltas(
    [
        'resources/deltas/1_alter_columns_one.sql',
        'resources/deltas/2_alter_columns_two.sql'
    ]
);
deploy.run();

```

### Example 3
```js
    var model = Ext.create('Model');
    var deploy = Ext.create('Mba.ux.DbDeployFileIncremental');

    deploy.setDb(model.getProxy().getDatabaseObject());
    deploy.setUri('resources/deltas'); // lembrar de adicionar no app.json para compilação
    deploy.setTimer(40000); // polling de 40 segundos, este é opcional
    deploy.run();

```

## Contato

<info@bluebile.com>