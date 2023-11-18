from sqlalchemy import create_engine, MetaData
from sqlalchemy.orm import sessionmaker
from sqlalchemy_utils import database_exists, create_database
import os.path
from loguru import logger

BASE_DIR = os.path.dirname(os.path.abspath(__file__))
db_path = os.path.join(BASE_DIR, "models.db")
SQLALCHEMY_DATABASE_URL = f"sqlite:///{db_path}"

engine = create_engine(
    SQLALCHEMY_DATABASE_URL,
    connect_args={'check_same_thread': False}
)

SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)


def get_db():
    db = SessionLocal()
    try:
        yield db
    except Exception as e:
        logger.exception(e)
        logger.error(f"Database-level error occurred. Details: {str(e)}")
    finally:
        db.close()


def create_database_if_not_exists(db_engine=None):
    if db_engine is None:
        db_engine = engine
    if not database_exists(db_engine.url):
        create_database(db_engine.url)
        logger.info("Database created.")


def create_tables(metadata=None, db_engine=None, drop_all=False, excepted_tables=None):
    if excepted_tables is None:
        excepted_tables = [
            'disability_types',
        ]
    if not metadata:
        metadata = MetaData()
    if db_engine is None:
        db_engine = engine
    if drop_all:
        for table in reversed(metadata.sorted_tables):
            if table.name not in excepted_tables:
                logger.info(f"Dropped table {table.name}")
                table.drop(db_engine)
    metadata.create_all(db_engine)
    logger.info("Tables created.")
