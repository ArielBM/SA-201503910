CREATE TABLE product (
    id            INTEGER NOT NULL,
    name          VARCHAR(64) NOT NULL,
    description   VARCHAR(256),
    price         NUMERIC,
    createdat     DATE,
    updatedat     DATE,
    CONSTRAINT product_pk PRIMARY KEY (id)
);