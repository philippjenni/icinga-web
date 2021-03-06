<?php
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

Doctrine_Manager::getInstance()->bindComponent('NsmUserRole', 'icinga_web');
/**
 * BaseNsmUserRole
 *
 * This class has been auto-generated by the Doctrine ORM Framework
 *
 * @property integer $usro_user_id
 * @property integer $usro_role_id
 * @property NsmUser $NsmUser
 * @property NsmRole $NsmRole
 *
 * @package    IcingaWeb
 * @subpackage AppKit
 * @author     Icinga Development Team <info@icinga.org>
 * @version    SVN: $Id: Builder.php 7490 2010-03-29 19:53:27Z jwage $
 */
abstract class BaseNsmUserRole extends Doctrine_Record {
    public function setTableDefinition() {
        $this->setTableName('nsm_user_role');
        $this->hasColumn('usro_user_id', 'integer', 4, array(
                             'type' => 'integer',
                             'length' => 4,
                             'fixed' => false,
                             'unsigned' => false,
                             'primary' => true,
                             'autoincrement' => false,
                         ));
        $this->hasColumn('usro_role_id', 'integer', 4, array(
                             'type' => 'integer',
                             'length' => 4,
                             'fixed' => false,
                             'unsigned' => false,
                             'primary' => true,
                             'autoincrement' => false,
                         ));
        $this->index('nsm_user_role_ix', array('fields'=>array('usro_role_id')));
    }

    public function setUp() {
        parent::setUp();
        $this->hasOne('NsmUser', array(
                          'local' => 'usro_user_id',
                          'foreign' => 'user_id',
                          'onDelete' => 'CASCADE',
                          'onUpdate' => 'CASCADE'
                      )

                     );

        $this->hasOne('NsmRole', array(
                          'local' => 'usro_role_id',
                          'foreign' => 'role_id',
                          'onDelete' => 'CASCADE',
                          'onUpdate' => 'CASCADE')
                     );
    }

    public static function getInitialData() {
        return array(
                   array('usro_user_id'=>'1','usro_role_id'=>'1'),
                   array('usro_user_id'=>'1','usro_role_id'=>'2'),
                   array('usro_user_id'=>'1','usro_role_id'=>'3')
               );
    }


}
