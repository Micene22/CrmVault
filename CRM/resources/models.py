import requests
from bs4 import BeautifulSoup
from django.db import models

class Category(models.Model):
    name = models.CharField(max_length=100)
    
    class Meta:
        verbose_name_plural = "Categories"

    def __str__(self):
        return self.name

class Resource(models.Model):
    title = models.CharField(max_length=200, blank=True) 
    url = models.URLField()
    description = models.TextField(blank=True)
    category = models.ForeignKey(Category, on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)

    def save(self, *args, **kwargs):
        # Se il titolo è vuoto, facciamo lo scraping
        if not self.title:
            try:
                response = requests.get(self.url, timeout=5)
                soup = BeautifulSoup(response.content, 'html.parser')
                if soup.title:
                    self.title = soup.title.string.strip()
                else:
                    self.title = self.url
            except Exception:
                self.title = self.url
        super().save(*args, **kwargs)

    def __str__(self):
        return self.title