StaffGrade_Form = Ext.extend(StaffGrade_FormUi, {
    initComponent : function() {
        StaffGrade_Form.superclass.initComponent.call(this);
        Ext.getCmp('btnSave_StaffGrade').on('click', this.submitForm, this);
    },
    submitForm : function(btn) {
        this.getForm().submit({
            success : function(form, action){
                var result = action.result;
                if (result) {
                    if (result.success) {
                    	 Ext.getCmp('staffGradeWinForm').close();
                        Ext.StoreMgr.get('dsStaffGrade').load({
                            
                        });
                        Ext.Msg.show({
                            title : 'Success',
                            msg : action.result.messages.message,
                            buttons : Ext.Msg.OK,
                            animEl : 'elId',
                            icon : Ext.MessageBox.INFO
                        });
                    } else {
                        Ext.Msg.show({
                            title : 'Error',
                            msg : action.result.messages.message,
                            buttons : Ext.Msg.OK
                        });
                    }
                }else{
                    if (action.failureType != 'client')
                    Ext.Msg.show({
                            title : 'Error',
                            msg : action.failureType+ 'side error ',
                            buttons : Ext.Msg.OK
                        });
                }
            },
            failure : function(form, action) {
                switch (action.failureType) {
                    case Ext.form.Action.CLIENT_INVALID:
                        Ext.Msg.alert('Failure', 'Form fields may not be submitted with invalid values');
                        break;
                                                            
                    case Ext.form.Action.CONNECT_FAILURE:
                        Ext.Msg.alert('Failure', 'Ajax communication failed');
                        break;
                    case Ext.form.Action.SERVER_INVALID:
                        Ext.Msg.alert('Failure', action.result.messages.message);
                }
            },
            waitTitle : 'saving',
            waitMsg : 'Processing, please wait'
        });
    },
    cancelForm : function(cmp) {
        Ext.getCmp('StaffGradeTab').items.get(3).setDisabled(false);
        Ext.getCmp('StaffGradeTab').setActiveTab(3);
        Ext.StoreMgr.get('dsStaffGrade').load();
    },
    showLovs : function(btn) {
        
    }
});