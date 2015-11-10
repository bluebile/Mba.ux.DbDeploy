Ext.define('Mba.ux.DbDeployFileIncremental', {
    extend: 'Mba.ux.DbDeployFile',
    requires: [ 'Ext.Direct', 'Ext.direct.PollingProvider' ],
    config: {
        extension: null,
        uri: '',
        timer: null
    },

    index: 1,

    initialize: function()
    {
        var localStorage = window.localStorage,
            item;

        item = localStorage.getItem(this.getId());

        if (item) {
            this.index = ++item;
        }
    },

    getRequestFileFailureCallback: function()
    {
        var me = this, fn;
        fn = function() {
            me.callParent();
            me.polling();
        }

        return fn();
    },

    polling: function()
    {
        var me = this;

        if (me.getTimer()) {
            var fn = function() {
                me.run();
            };

            Ext.Direct.addProvider({
                type: 'polling',
                url: fn,
                interval: me.getTimer()
            });

            return;
        }
    },

    runSql: function(dmls, index, transaction)
    {
        return this.parseSql(dmls, index, transaction);
    },

    getExtension: function()
    {
        if (!this.extension) {
            return 'sql';
        }

        return this.extension;
    },

    nextDelta: function()
    {
        this.runDeltas(null, ++this.index);
    },

    getFile: function(files, index)
    {
        return this.getUri() + '/' + index + '.' + this.getExtension();
    },

    updateDeltas: function()
    {
        throw 'Essa classe não suporta a chamada deste método';
    },

    getId: function(index)
    {
        return 'db_deploy_file_incremental';
    }
});
