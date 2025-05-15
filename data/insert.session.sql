ALTER TABLE Administrateur ADD COLUMN id_user INT REFERENCES utilisateur(id);

SELECT count(*) FROM Information;

SELECT * FROM utilisateur WHERE email='sy.fallou@ugb.edu.sn' AND password ='conseil@conseil';

SELECT * FROM administrateur WHERE id_user=1;