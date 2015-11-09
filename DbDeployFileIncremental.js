Ext.define('Mba.ux.DbDeployFileIncremental', {
    extend: 'Mba.ux.DbDeployFile',

    config: {
        extension: null,
        uri: ''
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
