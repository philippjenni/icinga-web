Ext.ns("AppKit.util");

AppKit.util.AppKitNavBar = Ext.extend(Ext.Container,{ 
	layout:         null, 
    menuData:       {},
    preferenceURL:  null,
    logoutURL:      null,
    username:       null,
    hasAuth:        false,
    navBar:         null,
    iconField:      null,
    

    defaultCfg: {
        layout: 'column',
	    id: 'menu',
	    border: false,
	    defaults: { style: { borderLeft: '1px #d0d0d0 solid' }, border: false, height: 40 }
    },

    // default config for the menubar field
    tbarCfg: {
    	id: 'menu-navigation',
		defaults: { border: false, style: 'margin:2px' },
		style: 'border: none',	
        height: 35,
        items: {},
        columnWidth: 1
    },

    // default config for the icon field
    iconFieldCfg: {
        id: 'menu-logo',
		width: 60,
		height: 30,
		border: false,
		cls: 'icinga-link',
		items: {
			width: 61,
			border: false,
			autoEl: 'div',
			frame: false,
		    cls: 'menu-logo-icon'	
        }
    },

    constructor: function(cfg) {
        if(Ext.getCmp(this.defaultCfg.id))
            throw("Menubar is already loaded");   
        Ext.apply(this,cfg);
        this.buildNavBar();
        this.buildIconField();
        Ext.apply(cfg,this.defaultCfg);
        cfg.items = [
            this.navBar,
            this.iconField
        ]
        
        Ext.Container.prototype.constructor.call(this,cfg); 
    }, 

    
    buildNavBar:function() {
        var cfg = {};
        var cfg = Ext.apply(cfg,this.tbarCfg); 
        this.initMenuItems(cfg);
        this.navBar = new Ext.Toolbar(cfg);
    },
    
    buildIconField : function() {
        this.iconField = new Ext.Container(this.iconFieldCfg);
        // Make the icon funky when loading
        Ext.Ajax.on("beforerequest",function() {
			try {
				var icon = Ext.DomQuery.selectNode('.menu-logo-icon');
				if(!icon)
					return true;
				Ext.get(icon).setStyle('background-image','url('+AppKit.c.path+'/images/ajax/icinga-throbber.gif)');
			} catch(e) {
				// ignore any errors
			}
		});
		Ext.Ajax.on("requestcomplete",function() {
			try {
				var icon = Ext.DomQuery.selectNode('.menu-logo-icon');
				if(!icon)
					return true;
				Ext.get(icon).setStyle('background-image','url('+AppKit.c.path+'/images/icinga/idot-small.png)');
			} catch(e) {
				// ignore any errors
			}
		});


	    this.iconField.on('render', function(c) {
			c.getEl().on('click', function() {
				AppKit.changeLocation('http://www.icinga.org');
			});
		});
    },

    initMenuItems : function(cfg) {
        cfg.items = [];
        this.addMenuFields(cfg.items,this.menuData); 
        this.addUserFields(cfg.items);
    },

    addMenuFields : function(itemsCfg,menuData) {
       
        for(var i=0;i<menuData.length;i++) {
            var menuPoint = menuData[i];
            var p = {
                text: _(menuPoint.caption),
                iconCls: menuPoint.icon || null,
                id: menuPoint.id || Ext.id(),          
            }         
            if(menuPoint.target) {
                p.handler = this.createHandlerForTarget(menuPoint.target);
            }
            if(menuPoint.items) {
                p.menu = [];
                this.addMenuFields(p.menu,menuPoint.items)
            }
            itemsCfg.push(p); 
        }

    },

    createHandlerForTarget: function(target) {
        switch(target.target) {
            case 'new':
                return Ext.createDelegate(AppKit.changeLocation,window,[target.url]); 
            case 'container':
                return function() {
                    var el = Ext.get(target.id);
                    if(!el) {
                        AppKit.log("Error: id "+target.id+" not found");
                    
                    } else {
                        var updater = el.getUpdater();
                        updater.update({
                            url:target.url,
                            params: target.params || null
                        });
                    }
                }

            case 'window': 
                target.bodyStyle = target.style || "background-color: #ffffff";
                return Ext.createDelegate(AppKit.util.contentWindow, this, [{
                    url: target.url
                },  target]);  
        }
    },

    addUserFields : function(itemsCfg) { 
        itemsCfg.push({xtype : 'tbfill'});
        var userField = {
            iconCls: this.hasAuth ? 'icinga-icon-user' : 'icinga-icon-user-delete',
            text: this.username
        }
        if(this.hasAuth) {
            userField.menu = {};
            userField.menu.items = {
                xtype: 'buttongroup',
                columns: 2,
                autoWidth: true,
                defaults: {
                    scale: 'large',
                    iconAlign: 'left',
                    width: '100%'
                    
                },
                items: [{
                    tooltip: _('Preferences'),
                    iconCls: 'icinga-icon-user-edit',
                    text: _('Preferences'),
                    handler: function() { 
                        AppKit.util.doPreferences(this.peferenceURL);
                    }
                }, {
                    tooltip: _('Logout'),
                    iconCls: 'icinga-icon-user-go',
                    width: 'auto',
                    handler: function() {
                        AppKit.util.doLogout(this.logoutURL);
                    }
                }]
            } 
        }
        itemsCfg.push(userField);
    }
});
    
 