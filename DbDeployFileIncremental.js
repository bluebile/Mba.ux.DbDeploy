Ext.define('Mba.ux.DbDeployFileIncremental', {
    extend: 'Mba.ux.DbDeployFile',
    requires: [ 'Ext.Direct', 'Ext.direct.PollingProvider' ],
    config: {
        extension: null,
        uri: '',
        timer: null
    },

    index: 1,
    pollingActive: false,

    initialize: function()
    {
        this.callParent();
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
            me.superclass.getRequestFileFailureCallback()();
            if (!me.pollingActive) {
                me.polling();
                me.pollingActive = true;
            }
        }

        return fn;
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
        }
    },

    runSql: function(dmls, index, transaction)
    {
        return this.parseSql(dmls, index, transaction);
    },

    getExtension: function()
    {
        if (this.extension === null) {
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
        if (!this.getExtension()) {
            return Url.get(this.getUri()) + '/' + index;
        }

        return Url.get(this.getUri()) + '/' + index + '.' + this.getExtension();
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
