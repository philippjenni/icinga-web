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


/**
 * NsmSession
 *
 * This class has been auto-generated by the Doctrine ORM Framework
 *
 * @package    IcingaWeb
 * @subpackage AppKit
 * @author     Icinga Development Team <info@icinga.org>
 * @version    SVN: $Id: Builder.php 5318 2008-12-19 20:44:54Z jwage $
 */
class NsmSession extends BaseNsmSession {

    public function get($val, $load=true) {
        $val = parent::get($val, $load);

        if (is_resource($val)) {
            return stream_get_contents($val);
        }

        return $val;
    }

    public function setUp() {

        parent::setUp();

        $options = array(
                       'created' =>  array('name'   => 'session_created'),
                       'updated' =>  array('name'   => 'session_modified'),
                   );

        $this->actAs('Timestampable', $options);

    }
}
