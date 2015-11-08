Ext.define('Mba.ux.DbDeploy', {
    extend: 'Ext.Evented',

    config: {
        db: null,
        deltas: null
    },

    run: function()
    {
        var me = this,
            deltas = this.getDeltas(),
            i, length = deltas.length;

        for (i = 0; i < length; i++) {
            me.runDelta(deltas, i);
        }
    },

    runDelta: function(deltas, index)
    {
        var me = this;
        me.getDb().transaction(function(transaction) {
            me.runSql(deltas, index, transaction);
        });
    },

    runSql: function(dmls, index, transaction)
    {
        var localStorage = window.localStorage,
            item;

        item = localStorage.getItem(this.getId(index));

        if (item) {
            return;
        }

        this.parseSql(dmls, index, transaction);
    },

    parseSql: function(dmls, index, transaction)
    {
        var i,
            length = dmls[index].length;
        for (i = 0; i < length; i++) {
            this.executeSql(transaction, dmls[index][i], index);
        }
    },

    executeSql: function(transaction, sql, id)
    {
        var me = this;
        transaction.executeSql(sql, [], function() {
            var localStorage = window.localStorage;
            localStorage.setItem(me.getId(id), true);
        });
    },

    getId: function(index)
    {
        return 'db_deploy_file' + index;
    }
});
