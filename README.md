# Plugin para execução de scripts e arquivos delta para atualização de banco


## Utilização

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

## Contato

<info@bluebile.com>