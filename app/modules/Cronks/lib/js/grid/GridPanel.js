
Ext.ns('Cronk.grid');

Cronk.grid.GridPanel = Ext.extend(Ext.grid.GridPanel, {
	meta : {},
	filter: {},
	
	initComponent : function() {
		this.tbar = this.buildTopToolbar();
		
		Cronk.grid.GridPanel.superclass.initComponent.call(this);
	},

	// Top toolbar of the grid
	buildTopToolbar : function() {
		return new Ext.Toolbar({
			items: [{
				text: _('Refresh'),
				iconCls: 'silk-arrow-refresh',
				tooltip: _('Refresh the data in the grid'),
				handler: function(oBtn, e) { this.store.reload(); },
				scope: this
			}, {
				text: _('Settings'),
				iconCls: 'silk-cog',
				toolTip: _('Grid settings'),
				menu: {
					items: [{
						// xtype: 'button',
						text: _('Auto refresh'),
						iconCls: 'silk-database-refresh',
						enableToggle: true,
						handler: function(oBtn, e) {
							
							if (oBtn.pressed == true) {
								this.trefresh = AppKit.getTr().start({
									run: function() {
										this.getStore().reload();
									},
									interval: 120000,
									scope: this
								});
							}
							else {
								AppKit.getTr().stop(this.trefresh);
								delete this.trefresh;
							}
							
						},
						scope: this
					},{
						text: _('Get this view as URL'),
						iconCls: 'silk-anchor',
						handler: function(oBtn,e) {
							var store = this.parentCmp.grid.store;
							var cronk = this.ownerCt.CronkPlugin.cmpConfig;
							var urlParams = "cr_base=";

							var counter = 0;						
							for(var i in store.baseParams) {
								var name = i.replace(/(.*?)\[(.*?)\]/g,"$1\|$2_"+counter);	
								urlParams += name+"["+store.baseParams[i]+"];";
								counter++;
							}
							
							urlParams += 
								"/groupDir="+store.groupDir+"/"+
								"groupField="+store.groupField+"/"+
								"template="+this.parentCmp.params.template+"/"+
								"crname="+cronk.crname+"/"+
								"title="+cronk.title;
							
						
							new Ext.Window({
								renderTo:Ext.getBody(),
								modal:true,
								initHidden:false,
								width:500,
								autoHeight:true,
								closeable:true,
								layout:'form',
								title:_('Link to this view'),
								items: {
									xtype:'textfield',
									fieldLabel: _('Link'),
									width:250,
									value: this.parentCmp.meta.baseURL+"/customPortal/"+urlParams
								}
							});
						},
						scope:this
					}]
				}
			}]
		});
	},
	
	setMeta : function(m) {
		this.meta = m;
	},
	
	setFilter : function(f) {
		this.filter = f;
	}
	
});

Ext.reg('cronkgrid', Cronk.grid.GridPanel);
