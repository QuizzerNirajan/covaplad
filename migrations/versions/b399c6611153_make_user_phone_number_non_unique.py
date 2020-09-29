"""Make user phone number non unique

Revision ID: b399c6611153
Revises: 71b0eadbb125
Create Date: 2020-09-29 18:54:04.165104

"""
from alembic import op

# revision identifiers, used by Alembic.
revision = "b399c6611153"
down_revision = "71b0eadbb125"
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_index("phone_number", table_name="user")
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_index("phone_number", "user", ["phone_number"], unique=True)
    # ### end Alembic commands ###
