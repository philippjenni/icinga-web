<?php
/**
 * BaseIcingaServicegroupMembers
 *
 * This class has been auto-generated by the Doctrine ORM Framework
 *
 * @property integer $servicegroup_member_id
 * @property integer $instance_id
 * @property integer $servicegroup_id
 * @property integer $service_object_id
 *
 * @package    ##PACKAGE##
 * @subpackage ##SUBPACKAGE##
 * @author     ##NAME## <##EMAIL##>
 * @version    SVN: $Id: Builder.php 7490 2010-03-29 19:53:27Z jwage $
 */
abstract class BaseIcingaServicegroupMembers extends Doctrine_Record {
    public function setTableDefinition() {
        $conn = $this->getTable()->getConnection();
        if(!$conn)
            $conn = Doctrine_Manager::getInstance()->getConnection(IcingaDoctrineDatabase::CONNECTION_ICINGA);
        $prefix = $conn->getPrefix();
        $this->setTableName($prefix.'servicegroup_members');
        $this->hasColumn('servicegroup_member_id', 'integer', 4, array(
                             'type' => 'integer',
                             'length' => 4,
                             'fixed' => false,
                             'unsigned' => false,
                             'primary' => false,
                             'autoincrement' => true,
                         ));
        $this->hasColumn('instance_id', 'integer', 2, array(
                             'type' => 'integer',
                             'length' => 2,
                             'fixed' => false,
                             'unsigned' => false,
                             'primary' => false,
                             'default' => '0',
                             'notnull' => true,
                             'autoincrement' => false,
                         ));
        $this->hasColumn('servicegroup_id', 'integer', 4, array(
                             'type' => 'integer',
                             'length' => 4,
                             'fixed' => false,
                             'unsigned' => false,
                             'primary' => true,
                             'default' => '0',
                             'notnull' => true,
                             'autoincrement' => false,
                         ));
        $this->hasColumn('service_object_id', 'integer', 4, array(
                             'type' => 'integer',
                             'length' => 4,
                             'fixed' => false,
                             'unsigned' => false,
                             'primary' => true,
                             'default' => '0',
                             'notnull' => true,
                             'autoincrement' => false,
                         ));
    }

    public function setUp() {

        parent::setUp();
        $this->hasOne('IcingaInstances as instance', array(
                          'local' => 'instance_id',
                          'foreign' => 'instance_id'
                      ));

        $this->hasOne('IcingaServicegroups as servicegroup', array(
                          'local' => 'servicegroup_id',
                          'foreign' => 'servicegroup_id'
                      ));

        $this->hasOne('IcingaServices as service', array(
                          'local' => 'service_object_id',
                          'foreign' => 'service_object_id'
                      ));
    }
}
