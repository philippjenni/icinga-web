-- Default version bump
DELETE FROM nsm_db_version;
INSERT INTO nsm_db_version VALUES ('1','icinga-web/v1.9.0', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);

-- User description attribute (#3923)
ALTER TABLE nsm_user
    ADD (user_description VARCHAR2(255));