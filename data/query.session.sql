-- Table Utilisateur
CREATE TABLE Utilisateur (
    id SERIAL PRIMARY KEY,
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    status VARCHAR(10) CHECK (status IN ('admin', 'etudiant'))
);

-- Table Administrateur
CREATE TABLE Administrateur (
    code_admin VARCHAR(50) PRIMARY KEY,
    nom VARCHAR(100) NOT NULL,
    prenom VARCHAR(100) NOT NULL,
    fonction VARCHAR(20),
    id INT NOT NULL UNIQUE REFERENCES Utilisateur(id)
);

-- Table Information
CREATE TABLE Information (
    id SERIAL PRIMARY KEY,
    concerne VARCHAR(255) NOT NULL,
    contenu VARCHAR(255) NOT NULL,
    date_envoie DATE,
    code_admin VARCHAR(50) NOT NULL REFERENCES Administrateur(code_admin)
);

-- Table Inscription
CREATE TABLE Inscription (
    id SERIAL PRIMARY KEY,
    dateInscription DATE,
    status BOOLEAN NOT NULL
);

-- Table Niveau
CREATE TABLE Niveau (
    id SERIAL PRIMARY KEY,
    nom VARCHAR(100) NOT NULL CHECK (nom IN ('Licence 1','Licence 2','Licence 3','Master 1','Master 2')),
    annee_academique INT
);

-- Table Etudiant
CREATE TABLE Etudiant (
    id SERIAL PRIMARY KEY,
    code_etudiant VARCHAR(50) NOT NULL UNIQUE,
    nom VARCHAR(100) NOT NULL,
    prenom VARCHAR(100) NOT NULL,
    telephone VARCHAR(20),
    adress TEXT,
    id_niveau INT NOT NULL REFERENCES Niveau(id),
    idInscription INT NOT NULL UNIQUE REFERENCES Inscription(id),
    idUser INT NOT NULL UNIQUE REFERENCES Utilisateur(id)
);

-- Table Message
CREATE TABLE Messages (
    id SERIAL PRIMARY KEY,
    contenu VARCHAR(250) NOT NULL,
    date_envoie DATE NOT NULL,
    lu BOOLEAN NOT NULL,
    id_etudiant INT NOT NULL REFERENCES Etudiant(id),
    code_admin VARCHAR(50)  NOT NULL REFERENCES Administrateur(code_admin)
);

-- Table Gerer
CREATE TABLE Gerer (
    code_admin VARCHAR(50) NOT NULL REFERENCES Administrateur(code_admin),
    id_inscription INT NOT NULL REFERENCES Inscription(id),
    PRIMARY KEY (code_admin, id_inscription)
);

-- Table Matiere
CREATE TABLE Matiere (
    id SERIAL PRIMARY KEY,
    code VARCHAR(255) NOT NULL UNIQUE,
    intitule VARCHAR(255) NOT NULL,
    credit INT NOT NULL,
    anneeAcademicque VARCHAR(50) NOT NULL
);

-- Table Semestre
CREATE TABLE Semestre (
    id SERIAL PRIMARY KEY,
    numero INT NOT NULL UNIQUE CHECK (numero BETWEEN 1 AND 10),
    date_debut DATE NOT NULL,
    date_fin DATE NOT NULL
);

-- Table Conserne
CREATE TABLE Conserne (
    id_matiere INT NOT NULL REFERENCES Matiere(id),
    id_inscription INT NOT NULL REFERENCES Inscription(id),
    PRIMARY KEY (id_matiere, id_inscription)
);

-- Table Contenir
CREATE TABLE Contenir (
    id_matiere INT NOT NULL REFERENCES Matiere(id),
    id_semestre INT NOT NULL REFERENCES Semestre(id),
    PRIMARY KEY (id_matiere, id_semestre)
);

-- Table Formation
CREATE TABLE Formation (
    id SERIAL PRIMARY KEY,
    nom VARCHAR(255) NOT NULL,
    pseudo VARCHAR(10) NOT NULL,
    anneeAcademicque VARCHAR(50) NOT NULL
);

-- Table Appartinir
CREATE TABLE Appartinir (
    id_matiere INT NOT NULL REFERENCES Matiere(id),
    id_niveau INT NOT NULL REFERENCES Niveau(id),
    id_specialite INT NOT NULL REFERENCES Specialite(id)
);