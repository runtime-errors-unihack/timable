from sqlalchemy import Boolean, Column, ForeignKey, Integer, String, Enum, Float, Table, DateTime, func
from sqlalchemy.orm import relationship
from sqlalchemy.ext.declarative import declarative_base


BaseModel = declarative_base()


class UserModelDB(BaseModel):
    __tablename__ = "users"
    id = Column(Integer, primary_key=True, index=True, autoincrement=True)
    username = Column(String, unique=True, index=True, nullable=False)
    password = Column(String, nullable=False)
    email = Column(String, unique=True, nullable=False)
    profile_pic_url = Column(String, nullable=True, default=None)
    is_admin = Column(Boolean, default=False, nullable=False)
    name = Column(String, nullable=True)
    surname = Column(String, nullable=True)
    phone = Column(String, nullable=True)
    votes = relationship("VoteModelDB", back_populates="user")
    pins = relationship("PinModelDB", back_populates="user")
    is_visually_impaired = Column(Boolean, default=False, nullable=True)


pin_disability_association = Table(
    "pin_disability_association",
    BaseModel.metadata,
    Column("pin_id", Integer, ForeignKey("pins.id")),
    Column("disability_type_id", Integer, ForeignKey("disability_types.id")),
)


class PinModelDB(BaseModel):
    __tablename__ = "pins"
    id = Column(Integer, primary_key=True, index=True, autoincrement=True)
    latitude = Column(Float, nullable=False)
    longitude = Column(Float, nullable=False)
    status = Column(
        Enum(
            "good",
            "bad",
            "closed",
        )
    )
    tag = Column(
        Enum("parking", "toilet", "elevator", "ramp", "stairs", "other", nullable=True)
    )
    image_url = Column(String, nullable=True)
    user_id = Column(Integer, ForeignKey("users.id"))
    description = Column(String, nullable=True)
    disability_types = relationship(
        "DisabilityTypeModelDB",
        secondary=pin_disability_association,
        back_populates="pins",
    )
    is_anonymous = Column(Boolean, default=False, nullable=True)
    date_created = Column(DateTime, default=func.now(), nullable=False)


    votes = relationship("VoteModelDB", back_populates="pin")
    user = relationship("UserModelDB", back_populates="pins")



class VoteModelDB(BaseModel):
    __tablename__ = "votes"
    id = Column(Integer, primary_key=True, index=True, autoincrement=True)
    user_id = Column(Integer, ForeignKey("users.id"))

    pin_id = Column(Integer, ForeignKey("pins.id"))

    user = relationship("UserModelDB", back_populates="votes")

    pin = relationship("PinModelDB", back_populates="votes")

    state = Column(
        Enum(
            "positive",
            "neutral",
            "negative",
        )
    )


class DisabilityTypeModelDB(BaseModel):
    __tablename__ = "disability_types"
    id = Column(Integer, primary_key=True, index=True, autoincrement=True)
    name = Column(String, nullable=False)
    pins = relationship(
        "PinModelDB",
        secondary=pin_disability_association,
        back_populates="disability_types",
    )
