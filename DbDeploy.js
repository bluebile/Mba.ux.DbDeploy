Ext.define('Mba.ux.DbDeploy', {
    extend: 'Ext.Evented',

    config: {
        db: null,
        deltas: null
    },

    failure: false,
    index: 0,

    run: function()
    {
        var me = this,
            deltas = this.getDeltas(),
            i, length = deltas.length;

        me.runDeltas(deltas, me.index);
    },

    runDeltas: function(deltas, index)
    {
        var me = this;

        me.getDb().transaction(function(transaction) {
            me.runSql(deltas, index, transaction);
        }, Ext.emptyFn, function() {
            var localStorage = window.localStorage;
            localStorage.setItem(me.getId(index), true);
            me.nextDelta();
        });
    },

    runSql: function(dmls, index, transaction)
    {
        var localStorage = window.localStorage,
            item;

        item = localStorage.getItem(this.getId(index));

        if (item) {
            return;                                                                                                                            sol
        }

        this.parseSql(dmls, index, transaction);
    },

    parseSql: function(dmls, index, transaction)
    {
        var i,
            length = dmls[index].length;
        for (i = 0; i < length; i++) {
            this.executeSql(transaction, dmls[index][i]);
        }
    },

    executeSql: function(transaction, sql)
    {
        var me = this;
        transaction.executeSql(sql, [], Ext.emptyFn, function() {
            console.log('Problema dml ' + sql);
            return true;
        });
    },

    nextDelta: function()
    {
        var me     = this,
            deltas = me.getDeltas(),
            length = deltas.length;
        if (me.index < (length-1)) {
            me.runDeltas(deltas, ++me.index);
        }
    },

    getId: function(index)
    {
        return 'db_deploy_file' + index;
    }
});
