from sqlalchemy import Boolean, Column, ForeignKey, Integer, String, Enum, Float
from sqlalchemy.orm import relationship
from sqlalchemy.ext.declarative import declarative_base


BaseModel = declarative_base()


class UserModelDB(BaseModel):
    __tablename__ = "users"
    id = Column(
        Integer,
        primary_key=True,
        index=True,
        autoincrement=True
    )
    username = Column(
        String,
        unique=True,
        index=True,
        nullable=False
    )
    password = Column(
        String,
        nullable=False
    )
    email = Column(
        String,
        unique=True,
        nullable=False
    )
    is_admin = Column(
        Boolean,
        default=False,
        nullable=False
    )
    name = Column(
        String,
        nullable=True)
    surname = Column(
        String,
        nullable=True
    )
    phone = Column(
        String,
        nullable=True
    )

    # pins = relationship(
    #     "PinModelDB",
    #     back_populates="user"
    # )
    # votes = relationship(
    #     "VoteModelDB",
    #     back_populates="user"
    # )


class PinModelDB(BaseModel):
    __tablename__ = "pins"
    id = Column(
        Integer,
        primary_key=True,
        index=True,
        autoincrement=True
    )
    latitude = Column(
        Float,
        nullable=False
    )
    longitude = Column(
        Float,
        nullable=False
    )
    status = Column(
        Enum(
            "good",
            "bad",
            "closed",
        )
    )
    image_url = Column(
        String,
        nullable=False
    )
    type = Column(
        String,
        nullable=False
    )
    # type = relationship(
    #     "PinTypeModelDB",
    #     back_populates="category"
    # )
    # user = relationship(
    #     "UserModelDB",
    #     back_populates="user"
    # )


class VoteModelDB(BaseModel):
    __tablename__ = "votes"
    id = Column(
        Integer,
        primary_key=True,
        index=True,
        autoincrement=True
    )

    user_id = Column(
        Integer,
        ForeignKey("users.id")
    )



    pin_id = Column(
        Integer,
        ForeignKey("pins.id")
    )
    # user = relationship(
    #     "UserModelDB",
    #     back_populates="votes"
    # )
    # pin = relationship(
    #     "PinModelDB",
    #     back_populates="votes"
    # )

    positive = Column(
        Boolean,
        nullable=False
    )


class PinTypeModelDB(BaseModel):
    __tablename__ = "pin_types"
    id = Column(
        Integer,
        primary_key=True,
        index=True,
        autoincrement=True
    )
    name = Column(
        String,
        nullable=False
    )
    # pin = relationship(
    #     "PinModelDB",
    #     back_populates="type"
    # )
