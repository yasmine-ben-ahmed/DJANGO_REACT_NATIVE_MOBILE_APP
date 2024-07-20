from pathlib import Path
import os
import datetime
from datetime import timedelta

if os.name == 'nt':
    VENV_BASE = os.environ.get('VIRTUAL_ENV', None)
    if VENV_BASE:
        os.environ['PATH'] = os.path.join(VENV_BASE, 'Lib\\site-packages\\osgeo') + ';' + os.environ['PATH']
        os.environ['PROJ_LIB'] = os.path.join(VENV_BASE, 'Lib\\site-packages\\osgeo\\data\\proj')

BASE_DIR = Path(__file__).resolve().parent.parent

SECRET_KEY = 'django-insecure-)f4$xnn1#l9-*f2el51+$trewa5ny6fq-ua0g3le3z@_l^t%*y'
DEBUG = True

#ALLOWED_HOSTS = ['localhost', '127.0.0.1']
ALLOWED_HOSTS = ['localhost','192.168.84.243', '127.0.0.1']


INSTALLED_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    'userAPI',
    'myApp',
    'appSettings',
    'rest_framework',
    'corsheaders',
]

REST_FRAMEWORK = {
    'DEFAULT_PERMISSION_CLASSES': (
        'rest_framework.permissions.AllowAny',
    ),
    'DEFAULT_AUTHENTICATION_CLASSES': (
        'rest_framework_simplejwt.authentication.JWTAuthentication',
        'rest_framework.authentication.SessionAuthentication',
        'rest_framework.authentication.BasicAuthentication',
    ),
}

JWT_AUTH = {
    # how long the original token is valid for
    'JWT_EXPIRATION_DELTA': datetime.timedelta(days=3),
    # allow refreshing of tokens
    'JWT_ALLOW_REFRESH': True,
}

MIDDLEWARE = [
    'django.middleware.security.SecurityMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
    'corsheaders.middleware.CorsMiddleware'
]

CORS_ALLOW_ALL_ORIGINS = True 

ROOT_URLCONF = 'djangoProject.urls'

TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [],
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.debug',
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
            ],
        },
    },
]

WSGI_APPLICATION = 'djangoProject.wsgi.application'

DATABASES = {
    'default': {
        'ENGINE': 'django.contrib.gis.db.backends.postgis', 
        'NAME': 'project2024',
        'USER': 'postgres',
        'PASSWORD': '12345yasmine?',
        'HOST': 'localhost',
        'PORT': '5432',
    }
}

AUTH_PASSWORD_VALIDATORS = [
    {
        'NAME': 'django.contrib.auth.password_validation.UserAttributeSimilarityValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.MinimumLengthValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.CommonPasswordValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.NumericPasswordValidator',
    },
]

LANGUAGE_CODE = 'en-us'
TIME_ZONE = 'UTC'
USE_I18N = True
USE_TZ = True

STATIC_URL = 'static/'

DEFAULT_AUTO_FIELD = 'django.db.models.BigAutoField'
