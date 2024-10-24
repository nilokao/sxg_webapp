"""empty message

Revision ID: 60d0936a549f
Revises: 5af6cb730728
Create Date: 2024-10-24 11:57:39.532362

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '60d0936a549f'
down_revision = '5af6cb730728'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('noticias', schema=None) as batch_op:
        batch_op.add_column(sa.Column('image_link', sa.Text(), nullable=True))

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('noticias', schema=None) as batch_op:
        batch_op.drop_column('image_link')

    # ### end Alembic commands ###
