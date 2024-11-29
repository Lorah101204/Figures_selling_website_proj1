CREATE TABLE [users] (
  [id] char(10) UNIQUE PRIMARY KEY NOT NULL,
  [username] varchar(32) UNIQUE NOT NULL,
  [name] ntext NOT NULL,
  [password] varchar(32) NOT NULL,
  [email] varchar(200),
  [phone] char(10),
  [is_admin] boolean
)
GO

CREATE TABLE [products] (
  [id] char(12) UNIQUE PRIMARY KEY NOT NULL,
  [name] ntext,
  [price] decimal,
  [category] ntext,
  [desc] ntext,
  [type] ntext,
  [quantity] integer
)
GO

CREATE TABLE [orders] (
  [id] char(20) UNIQUE PRIMARY KEY NOT NULL,
  [user_id] char(10),
  [total] decimal,
  [payment_id] char(25),
  [created_at] timestamp,
  [modified_at] timestamp
)
GO

CREATE TABLE [cart] (
  [id] char(15) UNIQUE PRIMARY KEY NOT NULL,
  [product_id] char(12),
  [session_id] int,
  [quantity] integer,
  [total] decimal
)
GO

CREATE TABLE [payment_details] (
  [id] char(25) UNIQUE PRIMARY KEY NOT NULL,
  [order_id] char(20),
  [status] boolean,
  [created_at] timestamp,
  [modified_at] timestamp
)
GO

CREATE TABLE [shopping_session] (
  [id] int UNIQUE PRIMARY KEY NOT NULL,
  [user_id] char(10),
  [total] decimal,
  [created_at] timestamp,
  [modified_at] timestamp
)
GO

CREATE TABLE [order_items] (
  [order_id] char(20) UNIQUE PRIMARY KEY NOT NULL,
  [product_id] char(12),
  [created_at] timestamp,
  [modified_at] timestamp
)
GO

ALTER TABLE [cart] ADD FOREIGN KEY ([product_id]) REFERENCES [products] ([id])
GO

ALTER TABLE [order_items] ADD FOREIGN KEY ([product_id]) REFERENCES [products] ([id])
GO

ALTER TABLE [orders] ADD FOREIGN KEY ([user_id]) REFERENCES [users] ([id])
GO

ALTER TABLE [shopping_session] ADD FOREIGN KEY ([user_id]) REFERENCES [users] ([id])
GO

ALTER TABLE [order_items] ADD FOREIGN KEY ([order_id]) REFERENCES [orders] ([id])
GO

ALTER TABLE [orders] ADD FOREIGN KEY ([payment_id]) REFERENCES [payment_details] ([id])
GO

ALTER TABLE [cart] ADD FOREIGN KEY ([session_id]) REFERENCES [shopping_session] ([id])
GO

ALTER TABLE [users] ADD FOREIGN KEY ([username]) REFERENCES [users] ([email])
GO
