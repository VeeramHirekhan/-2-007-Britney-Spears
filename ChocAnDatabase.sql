--Generated automatically via QuickDBD

CREATE TABLE [Member] (
    [MemberNumber] INTEGER(9)  NOT NULL ,
    [Name] VARCHAR(25)  NOT NULL ,
    [Street] VARCHAR(25)  NOT NULL ,
    [City] VARCHAR(14)  NOT NULL ,
    [State] CHAR(2)  NOT NULL ,
    [ZipCode] INTEGER(5)  NOT NULL ,
    [Email] VARCHAR(40)  NOT NULL ,
    [Status] INTEGER  NOT NULL , -- what data type should this be?
    CONSTRAINT [PK_Member]
        PRIMARY KEY CLUSTERED ([MemberNumber] ASC)
)

CREATE TABLE [Provider] (
    [ProviderNumber] INTEGER(9)  NOT NULL ,
    [Name] VARCHAR(25)  NOT NULL ,
    [Street] VARCHAR(25)  NOT NULL ,
    [City] VARCHAR(14)  NOT NULL ,
    [State] CHAR(2)  NOT NULL ,
    [ZipCode] INTEGER(5)  NOT NULL ,
    [Email] VARCHAR(40)  NOT NULL ,
    CONSTRAINT [PK_Provider]
        PRIMARY KEY CLUSTERED ([ProviderNumber] ASC)
)

CREATE TABLE [Service] (
    [ServiceCode] INTEGER(6)  NOT NULL ,
    [Name] VARCHAR(20)  NOT NULL ,
    [Fee] DECIMAL(5,2)  NOT NULL ,
    CONSTRAINT [PK_Service] 
        PRIMARY KEY CLUSTERED ([ServiceCode] ASC)
)

CREATE TABLE [ProvidedService] (
    [MemberNumber] INTEGER(9)  NOT NULL ,
    [ProviderNumber] INTEGER(9)  NOT NULL ,
    [ServiceCode] INTEGER(6)  NOT NULL ,
    [DateProvided] DATE  NOT NULL ,
    [DateReceived] TIMESTAMP  NOT NULL ,
    [Comment] VARCHAR(100) 
    CONSTRAINT [FK_ProvidedService_MemberNumber]
        FOREIGN KEY([MemberNumber]) REFERENCES [Member] ([MemberNumber])
    CONSTRAINT [FK_ProvidedService_ProviderNumber]
        FOREIGN KEY([ProviderNumber]) REFERENCES [Provider] ([ProviderNumber])
    CONSTRAINT [FK_ProvidedService_ServiceCode]
        FOREIGN KEY([ServiceCode]) REFERENCES [Service] ([ServiceCode])
)

CREATE TABLE [Transaction] (
    [TransactionNumber] INTEGER(9)  NOT NULL ,
    [MemberNumber] INTEGER(9)  NOT NULL ,
    [Amount] DECIMAL(5,2)  NOT NULL ,
    [Date] TIMESTAMP  NOT NULL ,
    CONSTRAINT [PK_Transaction] 
        PRIMARY KEY CLUSTERED ([TransactionNumber] ASC)
    CONSTRAINT [FK_Transaction_MemberNumber]
        FOREIGN KEY([MemberNumber]) REFERENCES [Member] ([MemberNumber]) 
)

CREATE TABLE [Employee] (
    [EmployeeNumber] INTEGER(9)  NOT NULL ,
    [Name] VARCHAR(25)  NOT NULL ,
    [PhoneNumber] INTEGER(10)  NOT NULL ,
    [Street] VARCHAR(25)  NOT NULL ,
    [City] VARCHAR(14)  NOT NULL ,
    [State] CHAR(2)  NOT NULL ,
    [ZipCode] INTEGER(5)  NOT NULL ,
    [Email] VARCHAR(40)  NOT NULL ,
    CONSTRAINT [PK_Employee]
        PRIMARY KEY CLUSTERED ([EmployeeNumber] ASC)
)