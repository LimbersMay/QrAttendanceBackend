
INSERT INTO registry(registry_id, name, mothers_name, fathers_name) VALUES (5356, 'Limbert', 'May', 'Ek');
INSERT INTO registry(registry_id, name, mothers_name, fathers_name) VALUES (9135, 'Alberto', 'Hau', 'Lopez');
INSERT INTO registry(registry_id, name, mothers_name, fathers_name) VALUES (2356, 'Alejandra', 'Garcia', 'Caamal');

# Asociamos los registros a los QR
INSERT INTO qr_registry(qr_id, registry_id) VALUES (9284, 5356);
INSERT INTO qr_registry(qr_id, registry_id) VALUES (9352, 2356);
INSERT INTO qr_registry(qr_id, registry_id) VALUES (9284, 2356);
