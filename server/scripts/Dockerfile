FROM python:3.10-bookworm

WORKDIR /

COPY . .
RUN pip3 install --root-user-action=ignore pandas numpy
RUN pip3 install -r requirements.txt


CMD ["python3", "eval.py"]