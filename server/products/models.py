from django.db import models
from django.utils.text import slugify
from django.core.files import File
from PIL import Image
from io import BytesIO

class Category(models.Model):
  name = models.CharField(max_length=60)
  slug = models.SlugField()

  def __str__(self):
    return self.name
  
  def get_absolute_url(self):
      return f'/{self.slug}/'
  

def upload_image_to(self, filename):
  return f'uploads/{self.product.category.name}/{self.product.name}'


class Product(models.Model):
  category = models.ForeignKey(Category, on_delete=models.CASCADE, related_name="products")
  name = models.CharField(max_length=100)
  slug = models.SlugField(unique=True, blank=True, null=True)
  description = models.TextField()
  price = models.DecimalField(max_digits=10, decimal_places=2)
  discount_price = models.DecimalField(max_digits=10, decimal_places=2, blank=True, null=True)
  date_added = models.DateTimeField(auto_now_add=True)

  class Meta:
    ordering = ('-date_added',)

  def save(self, *args, **kwargs):
      if not self.slug:
          self.slug = slugify(self.name)
      return super().save(*args, **kwargs)

  def __str__(self):
    return self.name

  def get_absolute_url(self):
      return f'/{self.category}/{self.slug}/'  

class Images(models.Model):
  title = models.CharField(max_length=200)
  product = models.ForeignKey(Product, on_delete=models.CASCADE, related_name='images')
  image = models.ImageField(upload_to=upload_image_to, blank=True, null=True)
  thumbnail = models.ImageField(upload_to=upload_image_to, blank=True, null=True)

  def __str__(self):
        return self.title

  
  def get_image(self):
    if self.image:
      return self.image.url
    return ''

  def get_thumbnail(self):
      if self.thumbnail:
          return self.thumbnail.url
      else:
          if self.image:
              self.thumbnail = self.make_thumbnail(self.image)
              self.save()

              return self.thumbnail.url
          else:
              return ''

  def make_thumbnail(self, image, size=(550 ,400)):
      img = Image.open(image)
      img.convert('RGB')
      img.thumbnail(size)

      thumb_io = BytesIO()
      img.save(thumb_io, 'JPEG', quality=98)

      thumbnail = File(thumb_io, name=image.name)

      return thumbnail