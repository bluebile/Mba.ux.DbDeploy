Ext.define('Mba.ux.DbDeploy', {
    extend: 'Ext.Evented',

    config: {
        db: null,
        deltas: null
    },

    run: function()
    {
        var me = this;
        me.getDb().transaction(function(transaction) {
            me.runDeltas(transaction);
        });
    },

    runDeltas: function(transaction)
    {
        var deltas = this.getDeltas(),
            i, length = deltas.length;
        for (i = 0; i < length; i++) {
            transaction.executeSql(this.parseSql(deltas[i]));
        }
    },

    /**
     * Essa funçao pode ser usada caso o conteudo do arquivo remoto esteja encriptada com alguma chave
     * @param string delta
     * @returns {*}
     */
    parseSql: function(delta)
    {
        return delta;
    }
});
