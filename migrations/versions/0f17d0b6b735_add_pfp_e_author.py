"""add pfp e author

Revision ID: 0f17d0b6b735
Revises: 29aba3ef2cdb
Create Date: 2024-10-28 11:36:05.870761

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '0f17d0b6b735'
down_revision = '29aba3ef2cdb'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('noticias', schema=None) as batch_op:
        batch_op.add_column(sa.Column('author_id', sa.Integer(), nullable=False))
        # Dê um nome à restrição da chave estrangeira
        batch_op.create_foreign_key('fk_noticias_autor', 'usuarios', ['author_id'], ['id'])

    with op.batch_alter_table('usuarios', schema=None) as batch_op:
        batch_op.add_column(sa.Column('profile_pic', sa.String(length=150), nullable=True))

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('usuarios', schema=None) as batch_op:
        batch_op.drop_column('profile_pic')

    with op.batch_alter_table('noticias', schema=None) as batch_op:
        # Dê um nome à restrição que você está removendo
        batch_op.drop_constraint('fk_noticias_autor', type_='foreignkey')
        batch_op.drop_column('author_id')

    # ### end Alembic commands ###