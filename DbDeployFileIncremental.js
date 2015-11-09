Ext.define('Mba.ux.DbDeployFileIncremental', {
    extend: 'Mba.ux.DbDeployFile',

    config: {
        extension: 'sql',
        uri: ''
    },

    initialize: function()
    {
        var localStorage = window.localStorage,
            item;

        item = localStorage.getItem(this.getId());

        if (item) {
            this.index = item;
        }
    },

    nextDelta: function()
    {
        this.runDeltas(null, ++this.index);
    },

    getFile: function(files, index)
    {
        return this.getUri() + '/' + (index + 1) + '.' + this.getExtension();
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
