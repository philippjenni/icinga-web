DELETE FROM nsm_db_version;
INSERT INTO nsm_db_version VALUES ('1','icinga-web/v1.7.1', NOW(), NOW());

SELECT setval('nsm_target_target_id_seq','21');