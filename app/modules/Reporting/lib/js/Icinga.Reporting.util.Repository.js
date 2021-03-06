// {{{ICINGA_LICENSE_CODE}}}
// -----------------------------------------------------------------------------
// This file is part of icinga-web.
//
// Copyright (c) 2009-2015 Icinga Developer Team.
// All rights reserved.
//
// icinga-web is free software: you can redistribute it and/or modify
// it under the terms of the GNU General Public License as published by
// the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version.
//
// icinga-web is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU General Public License for more details.
//
// You should have received a copy of the GNU General Public License
// along with icinga-web.  If not, see <http://www.gnu.org/licenses/>.
// -----------------------------------------------------------------------------
// {{{ICINGA_LICENSE_CODE}}}

Ext.ns('Icinga.Reporting.util');

Icinga.Reporting.util.Repository = Ext.extend(Icinga.Reporting.abstract.ResizedContainer, {
    layout : 'border',
    height : 800, // Don't worry, we resize later
    border : false,

    constructor : function(config) {
        Icinga.Reporting.util.OnTheFly.superclass.constructor.call(this, config);
    },

    initComponent : function() {

        Icinga.Reporting.util.OnTheFly.superclass.initComponent.call(this);

        this.resourceTree = new Icinga.Reporting.util.ResourceTree({
            region : 'west',
            width : 350,
            split: true,
            collapsible: true,
            treeloader_url: this.treeloader_url
        });

        this.contentResource = new Icinga.Reporting.util.ContentResourcePanel({
            region : 'center',
            resource_url : this.resource_url,
            parentCmp : this
        });

        this.resourceTree.getTreePanel().on('click', this.contentResource.processNodeClick, this.contentResource);

        this.add([this.resourceTree, this.contentResource]);

        this.doLayout();
    }
});
