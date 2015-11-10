Ext.define('Mba.ux.DbDeployFile', {
    extend: 'Mba.ux.DbDeploy',

    config: {
        requestFileSuccessCallback: null,
        requestFileFailureCallback: null
    },

    getRequestFileSuccessCallback: function()
    {
        if (!Ext.isFunction(this.requestFileSuccessCallback)) {
            return Ext.emptyFn;
        }

        return this.requestFileSuccessCallback;
    },

    getRequestFileFailureCallback: function()
    {
        if (!Ext.isFunction(this.requestFileFailureCallback)) {
            return Ext.emptyFn;
        }

        return this.requestFileFailureCallback;
    },

    deltasRunSuccess: [],

    parseSql: function(files, index, transaction)
    {
        var dmls, length, i;

        dmls = this.requestFile(this.getFile(files, index));

        if (!dmls) {
            return;
        }

        length = dmls.length;
        for (i = 0; i < length; i++) {
            this.executeSql(transaction, dmls[i], index);
        }
    },

    getFile: function(files, index)
    {
        return files[index];
    },

    requestFile: function(file)
    {
        var dmls,
            me = this;

        if (Ext.Array.contains(me.deltasRunSuccess, file)) {
            return;
        }

        Ext.Ajax.request({
            method: 'GET',
            url: file,
            responseType: 'text',
            async: false,
            success: function(response) {
                dmls = response.responseText.split(/;\n/g);
                me.deltasRunSuccess.push(file);
                me.getRequestFileSuccessCallback()();
            },
            failure: function() {
                me.getRequestFileFailureCallback()();
                throw 'Verifique os arquivos deltas';
            }
        });

        return dmls;
    }
});
