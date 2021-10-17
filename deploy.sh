echo "====== BUILDING THE IMAGE ====="
docker build -t testing_pipeline:1.0 .
echo "====== RUNNING THE CONTAINER ====="
docker run --name testing_container -p 3000:3000 -d testing_pipeline:1.0
sleep 2s
echo "====== STARTING TESTS ====="
npm test
docker kill testing_container
docker rm testing_container
