<?php
/**
 * This class has been auto-generated by the Doctrine ORM Framework
 */
class Addnsmprincipal extends Doctrine_Migration_Base
{
    public function up()
    {
        $this->createTable('nsm_principal', array(
             'principal_id' => 
             array(
              'type' => 'integer',
              'length' => 4,
              'unsigned' => 0,
              'primary' => true,
              'autoincrement' => true,
             ),
             'principal_user_id' => 
             array(
              'type' => 'integer',
              'length' => 4,
              'unsigned' => 0,
              'primary' => false,
              'notnull' => false,
              'autoincrement' => false,
             ),
             'principal_role_id' => 
             array(
              'type' => 'integer',
              'length' => 4,
              'unsigned' => 0,
              'primary' => false,
              'notnull' => false,
              'autoincrement' => false,
             ),
             'principal_type' => 
             array(
              'type' => 'enum',
              'length' => 4,
              'fixed' => false,
              'values' => 
              array(
              0 => 'role',
              1 => 'user',
              ),
              'primary' => false,
              'notnull' => true,
              'autoincrement' => false,
             ),
             'principal_disabled' => 
             array(
              'type' => 'integer',
              'length' => 1,
              'unsigned' => 0,
              'primary' => false,
              'default' => '0',
              'notnull' => false,
              'autoincrement' => false,
             ),
             ), array(
             'indexes' => 
             array(
             ),
             'primary' => 
             array(
              0 => 'principal_id',
             ),
             ));
    }

    public function down()
    {
        $this->dropTable('nsm_principal');
    }
}