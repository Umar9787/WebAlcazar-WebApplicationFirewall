# Generated by Django 3.2.7 on 2021-12-15 10:11

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0002_sqli_quarantine'),
    ]

    operations = [
        migrations.AlterField(
            model_name='sqli',
            name='time',
            field=models.DateTimeField(auto_created=True),
        ),
    ]
