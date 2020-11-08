# Generated by Django 3.1.3 on 2020-11-08 06:01

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("address", "0003_municipality_is_rural"),
    ]

    operations = [
        migrations.RemoveConstraint(
            model_name="district",
            name="unique_name_province",
        ),
        migrations.RemoveConstraint(
            model_name="municipality",
            name="unique_name_district",
        ),
        migrations.RemoveConstraint(
            model_name="province",
            name="unique_name_country",
        ),
        migrations.RemoveConstraint(
            model_name="ward",
            name="unique_number_municiplaity",
        ),
        migrations.AddConstraint(
            model_name="district",
            constraint=models.UniqueConstraint(
                fields=("name", "province"), name="district_unique_name_province"
            ),
        ),
        migrations.AddConstraint(
            model_name="municipality",
            constraint=models.UniqueConstraint(
                fields=("name", "district"), name="municipality_unique_name_district"
            ),
        ),
        migrations.AddConstraint(
            model_name="province",
            constraint=models.UniqueConstraint(
                fields=("name", "country"), name="province_unique_name_country"
            ),
        ),
        migrations.AddConstraint(
            model_name="ward",
            constraint=models.UniqueConstraint(
                fields=("number", "municipality"),
                name="ward_unique_number_municiplaity",
            ),
        ),
    ]
