Ext.define('Mba.ux.DbDeployFile', {
    extend: 'Mba.ux.DbDeploy',

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
        var dmls;
        Ext.Ajax.request({
            method: 'GET',
            url: file,
            responseType: 'text',
            async: false,
            success: function(response) {
                dmls = response.responseText.split(/;\n/g);
            }
        });

        return dmls;
    }
});
